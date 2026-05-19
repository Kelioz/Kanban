import { InternalOrderSortableField } from '@/shared/api/client/Api.schemas'
import type {
  TablePaginationConfig,
  SorterResult,
  FilterValue,
} from 'antd/es/table/interface'
import { useState } from 'react'

export const usePagination = () => {
  // Объединяем все параметры таблицы в одном состоянии
  const [tableParams, setTableParams] = useState({
    offset: 0,
    limit: 10,
  })
  const [tableFilters, setTableFilters] = useState<
    Record<string, FilterValue | null>
  >({})
  const handleTableChange = (
    pagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null> = {},
    sorter: SorterResult<any> | SorterResult<any>[] | undefined
  ) => {
    let newSortParam: string | undefined | null

    const getSortField = (
      field: React.Key | readonly React.Key[] | undefined
    ): string => {
      if (!field) return ''
      if (Array.isArray(field)) return field.join('.')
      return field.toString()
    }

    // Обрабатываем сортировку
    if (sorter) {
      // Проверяем сброс сортировки (третье нажатие)
      //@ts-ignore
      if (sorter.order === undefined) {
        newSortParam = null
      } else if (Array.isArray(sorter)) {
        const firstSorter = sorter.find((s) => s.field && s.order)
        if (firstSorter) {
          // Проверяем сброс сортировки для массива
          if (firstSorter.order === undefined) {
            newSortParam = null
          } else {
            const direction = firstSorter.order === 'ascend' ? '' : '-'
            newSortParam = `${direction}${getSortField(firstSorter.field)}`
          }
        }
      } else if (sorter.field && sorter.order !== undefined) {
        // Проверяем именно на undefined для сброса сортировки
        if (sorter.order === undefined) {
          newSortParam = null
        } else {
          const direction = sorter.order === 'ascend' ? '' : '-'
          newSortParam = `${direction}${getSortField(sorter.field)}`
        }
      }
    }

    // Объединяем старые и новые фильтры
    const mergedFilters = { ...tableFilters, ...newFilters }
    setTableFilters(mergedFilters)

    // Обновляем параметры таблицы с сохранением всех предыдущих параметров
    setTableParams((prevParams) => {
      const newParams = {
        ...prevParams,
        offset: ((pagination.current || 1) - 1) * (pagination.pageSize || 10),
        limit: pagination.pageSize || 10,
      }

      // Обрабатываем сортировку
      if (newSortParam !== undefined) {
        if (newSortParam === null) {
          // Удаляем параметр сортировки при сбросе
          delete (newParams as any).sort
        } else {
          // Устанавливаем новую сортировку
          ;(newParams as any).sort = newSortParam as unknown as
            | InternalOrderSortableField[]
            | undefined
        }
      }

      return newParams
    })
  }
  return {
    tableParams,
    tableFilters,
    handleTableChange,
    setTableParams,
  }
}
