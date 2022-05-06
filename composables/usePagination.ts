import type { Ref } from "vue";

export const usePagination = (array: any[] | Ref<any[]>, pSize: number | Ref<number>) => {
    const pageSize = isRef(pSize) ? pSize : ref(pSize);
    const currentIndex = ref(0);
    const docs: Ref<any[]> = isRef(array) ? array : ref(array);

    const totalItems = computed(() => docs.value.length);
    const currentPage = computed(() => currentIndex.value + 1);
    const pages = computed(() => Math.ceil(totalItems.value / pageSize.value));
    const result = computed(() => docs.value.slice(currentIndex.value * pageSize.value, (currentIndex.value + 1) * pageSize.value));

    const next = () => {
        currentIndex.value = Math.min(currentIndex.value + 1, pages.value - 1);
    };
    const prev = () => {
        currentIndex.value = Math.max(0, currentIndex.value - 1);
    };
    const first = () => {
        currentIndex.value = 0;
    };
    const last = () => {
        currentIndex.value = pages.value - 1;
    };

    return {
        result,
        pageSize,
        currentPage,
        totalItems,
        pages,
        next,
        prev,
        first,
        last
    };
};
