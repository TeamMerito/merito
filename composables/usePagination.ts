import type { ComputedRef, Ref } from "vue";
export type RefTyped<T> = T | Ref<T>;
export type RefElement = Element | Ref<Element | undefined>;
export type PaginationControl = () => void;
export const isNumber = (val: unknown): val is number => typeof val === "number";
export const minMax = (val: number, min: number, max: number): number => {
    if (val < min)
        return min;
    if (val > max)
        return max;
    return val;
};
export const wrap = (o: any): any => {
    return isRef(o) ? o : ref(o);
};

export interface PaginationResult {
    pageSize: Ref<number>
    total: Ref<number>
    currentPage: Ref<number>
    offset: Ref<number>
    lastPage: Readonly<Ref<number>>
    next: PaginationControl
    prev: PaginationControl
    first: PaginationControl
    last: PaginationControl
}

export interface ArrayPaginationResult<T extends Array<any>>
    extends PaginationResult {
    result: ComputedRef<T>
}

export interface PaginationOptions {
    pageSize: RefTyped<number>
    total: RefTyped<number>
    currentPage: RefTyped<number>
}

export const usePagination = (options: PaginationOptions): PaginationResult => {
    const _currentPage = wrap(options.currentPage);
    const _pageSize = wrap(options.pageSize);
    const _offset = ref(0);
    const total = wrap(options.total);

    const offset = computed<number>({
        get() {
            return _offset.value;
        },
        set(val) {
            if (isNaN(val)) {
                return;
            }
            _offset.value = Math.min(val, total.value);
        }
    });

    const pageSize = computed<number>({
        get() {
            return _pageSize.value;
        },
        set(val) {
            if (isNaN(val)) {
                return;
            }
            _pageSize.value = val;
        }
    });

    const lastPage = computed(() => Math.ceil(total.value / pageSize.value));

    const currentPage: Ref<number> = computed<number>({
        get() {
            return _currentPage.value;
        },
        set(val) {
            if (isNaN(val)) {
                return;
            }
            _currentPage.value = minMax(val, 1, lastPage.value);
            offset.value = (_currentPage.value - 1) * pageSize.value;
        }
    });

    currentPage.value = _currentPage.value;

    const prev = () => --currentPage.value;
    const next = () => ++currentPage.value;
    const first = () => (currentPage.value = 1);
    const last = () => (currentPage.value = lastPage.value);

    watch([total, pageSize], (_) => {
        if (currentPage.value > lastPage.value) {
            currentPage.value = lastPage.value;
        }
    }, { immediate: false });

    return {
        pageSize,
        total,
        currentPage,
        offset,
        lastPage,
        next,
        prev,
        first,
        last
    };
};

export const useArrayPagination = <T extends Array<any>> (array: RefTyped<T>, options?: Partial<Omit<PaginationOptions, "total">>): ArrayPaginationResult<T> => {
    const arrayRef = wrap(array);
    const pagination = usePagination({
        ...{
            currentPage: 1,
            pageSize: 10
        },
        ...options,
        total: computed(() => arrayRef.value.length)
    });

    const result = computed(() => {
        const array = arrayRef.value;
        if (!Array.isArray(array)) {
            return [];
        }
        return array.slice(
            pagination.offset.value,
            pagination.offset.value + pagination.pageSize.value
        );
    }) as ComputedRef<T>;

    return {
        ...pagination,
        result
    };
};
