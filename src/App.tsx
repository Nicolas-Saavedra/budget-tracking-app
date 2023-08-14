import { Container, Stack, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import BudgetModal from './components/BudgetModal'
import { useState } from 'react'
import './App.css'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext'
import AddExpenseModal from './components/AddExpenseModal'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpenseModal from './components/ViewExpenseModal'

function App() {

  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [currentBudgetId, setCurrentBudgetId] = useState('')
  const [viewExpensesModalId, setViewExpensesModalId] = useState<string | undefined>()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openExpenseModal(budgetId: string) {
    setShowAddExpenseModal(true)
    setCurrentBudgetId(budgetId)
  }

  return (
  <>
    <Container>
      <Stack direction='horizontal' gap={2} className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick={() => {setShowBudgetModal(true)}}>Add Budget</Button>
        <Button variant='outline-primary' onClick={() => {setShowAddExpenseModal(true)}}>Add Expense</Button>
      </Stack>
      <div className="main-grid">
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => { return total + expense.amount }, 0)
          return (
          <BudgetCard 
          key={budget.id}
          name={budget.name}
          amount={amount} max={budget.max} 
          onAddExpenseClick={() => openExpenseModal(budget.id)}
          onViewExpenseClick={() => setViewExpensesModalId(budget.id)}/>
          )
          })}
          <UncategorizedBudgetCard
          key={UNCATEGORIZED_BUDGET_ID}
          onAddExpenseClick={() => openExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          onViewExpenseClick={() => setViewExpensesModalId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard/>
      </div>
    </Container>
    <BudgetModal show={showBudgetModal} handleClose={() => {setShowBudgetModal(false)}}/>
    <AddExpenseModal show={showAddExpenseModal} handleClose={() => {setShowAddExpenseModal(false)}} defaultBudgetId={currentBudgetId}/>
    <ViewExpenseModal budgetId={viewExpensesModalId} handleClose={() => setViewExpensesModalId(undefined)} />
  </>
  )
}

export default App
