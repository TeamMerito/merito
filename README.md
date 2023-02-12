### Development

- Clone repo
- Install dependencies
- Create `.env` file:
```toml
SUPABASE_URL="https://<supabase-db-url>.supabase.co"
SUPABASE_KEY="<super-long-db-key>"
SUPABASE_REDIRECT="http://localhost:3000"
```
You can find these variables in the Supabase settings section.
<br>

- Start project
```sh
$ nr dev
```
<br>

Make sure the instance launches on port 3000 (`http://localhost:3000`) or Supabase won't connect