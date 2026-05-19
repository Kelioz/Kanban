import React from 'react'
import { useEffect, useState } from 'react'
import socket from '@/shared/lib/utils/socket'
import { ApiClient } from '@/shared/api/client'

export function KanBanPage() {
  const [columns, setColumns] = useState<any[]>([])
  const [boardId, setBoardId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Функция загрузки колонок и карточек
  const loadBoardData = async () => {
    try {
      // 1. Получаем все колонки доски
      const columnsData = await ApiClient.columnsControllerGetByBoard(
        '4ea8b2a8-5b76-4806-ac00-5f49600957ca'
      )

      // 2. Для каждой колонки загружаем карточки
      const columnsWithCards = await Promise.all(
        columnsData.map(async (column: any) => {
          try {
            const cards = await ApiClient.cardsControllerGetByColumn(
              column.uuid
            )
            return { ...column, cards: cards || [] }
          } catch (error) {
            console.error(
              `Error loading cards for column ${column.uuid}:`,
              error
            )
            return { ...column, cards: [] }
          }
        })
      )

      setColumns(columnsWithCards)

      // Сохраняем boardId из первой колонки
      if (columnsWithCards.length > 0 && !boardId) {
        const fetchedBoardId = columnsWithCards[0].boardId
        setBoardId(fetchedBoardId)

        // Подписываемся на WebSocket комнату доски
        socket.emit('joinBoard', { boardId: fetchedBoardId })
        console.log('📡 Subscribed to board:', fetchedBoardId)
      }
    } catch (error) {
      console.error('Error loading board data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Добавление новой карточки в состояние
  const addCardToState = (cardData: any) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.uuid === cardData.columnId
          ? {
              ...column,
              cards: [...column.cards, { ...cardData, uuid: cardData.cardId }],
            }
          : column
      )
    )
  }

  // Удаление карточки из состояния
  const deleteCardFromState = (cardData: any) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.uuid === cardData.columnId
          ? {
              ...column,
              cards: column.cards.filter(
                (card: any) => card.uuid !== cardData.cardId
              ),
            }
          : column
      )
    )
  }

  // Обновление карточки
  const updateCardInState = (cardData: any) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        cards: column.cards.map((card: any) =>
          card.uuid === cardData.cardId ? { ...card, ...cardData } : card
        ),
      }))
    )
  }

  // Перемещение карточки
  const moveCardInState = (data: any) => {
    setColumns((prevColumns) => {
      let movedCard: any = null
      let oldColumnCards: any[] = []
      let newColumnCards: any[] = []

      // Сначала находим карточку и удаляем её из старой колонки
      const afterRemove = prevColumns.map((column) => {
        if (column.uuid === data.fromColumnId) {
          const card = column.cards.find((c: any) => c.uuid === data.cardId)
          if (card)
            movedCard = {
              ...card,
              columnId: data.toColumnId,
              position: data.newPosition,
            }
          return {
            ...column,
            cards: column.cards.filter((c: any) => c.uuid !== data.cardId),
          }
        }
        return column
      })

      // Затем добавляем карточку в новую колонку
      return afterRemove.map((column) => {
        if (column.uuid === data.toColumnId && movedCard) {
          const newCards = [...column.cards]
          newCards.splice(data.newPosition, 0, movedCard)
          return { ...column, cards: newCards }
        }
        return column
      })
    })
  }

  useEffect(() => {
    loadBoardData()

    // Веб-сокет слушатели
    const onCardCreated = (data: any) => {
      console.log('🔥 New card:', data)
      addCardToState(data)
    }

    const onCardDeleted = (data: any) => {
      console.log('🗑️ Card deleted:', data)
      deleteCardFromState(data)
    }

    const onCardUpdated = (data: any) => {
      console.log('✏️ Card updated:', data)
      updateCardInState(data)
    }

    const onCardMoved = (data: any) => {
      console.log('🔄 Card moved:', data)
      moveCardInState(data)
    }

    socket.on('cardCreated', onCardCreated)
    socket.on('cardDeleted', onCardDeleted)
    socket.on('cardUpdated', onCardUpdated)
    socket.on('cardMoved', onCardMoved)

    return () => {
      socket.off('cardCreated', onCardCreated)
      socket.off('cardDeleted', onCardDeleted)
      socket.off('cardUpdated', onCardUpdated)
      socket.off('cardMoved', onCardMoved)
      if (boardId) {
        socket.emit('leaveBoard', { boardId })
      }
    }
  }, [])
  return (
    <div>
      <h1>Kanban Board</h1>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {columns.map((column) => (
          <div
            key={column.uuid}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '300px',
              minHeight: '400px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <h3 style={{ marginTop: 0 }}>{column.title}</h3>
            <div>
              {column.cards?.map((card: any) => (
                <div
                  key={card.uuid}
                  style={{
                    backgroundColor: 'white',
                    padding: '8px',
                    marginBottom: '8px',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
