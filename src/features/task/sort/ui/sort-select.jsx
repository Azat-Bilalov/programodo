import { useEffect } from "react"

export const SortSelect = ({ setSort, sort }) => {
    const SORT_FUNCS = {
        'created-asc': (a, b) => (a > b),
        'created-desc': (a, b) => (b.created - a.created),
        'updated-asc': (a, b) => (a.updated - b.updated),
        'updated-desc': (a, b) => b.updated - a.updated,
        'name-asc': (a, b) => a.name.localeCompare(b.name),
        'name-desc': (a, b) => b.name.localeCompare(a.name),
    }

    useEffect(() => {
        // console.log([5, 2, 5].sort(SORT_FUNCS["created-asc"]));
        setSort(SORT_FUNCS["created-asc"]);
    }, [])

    const handleSelectChange = (e) => {
        // console.log(e.target.value, sort);
        // setSort(SORT_FUNCS[e.target.value]);
        setSort((a, b) => a+b);
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Сортировка</span>
            <select
                className="px-4 py-2 rounded-sm bg-white text-gray-900"
                value={Object.keys(SORT_FUNCS).find(key => SORT_FUNCS[key] === sort)}
                onChange={handleSelectChange}
            >
                {Object.keys(SORT_FUNCS).map(key =>
                    <option key={key} value={key}>
                        {key}
                    </option>
                )}
            </select>
        </div>
    )
}