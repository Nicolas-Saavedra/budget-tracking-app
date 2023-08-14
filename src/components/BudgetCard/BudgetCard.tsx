import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../../helpers/currencyFormatter';
import './BudgetCard.css';

export interface BudgetCardProps {
    name: string;
    amount: number;
    max?: number;
    gray?: boolean;
    onViewExpenseClick?: () => void;
    onAddExpenseClick?: () => void;
    hideButtons?: boolean
}

function BudgetCard({ name, amount, max, onViewExpenseClick, onAddExpenseClick, gray = false, hideButtons = false }: BudgetCardProps) {

    return (
        <Card className={gray ? 'bg-gray' : ''}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>
                        {currencyFormatter.format(amount)} 
                        {max && (<span className='text-muted fs-6 ms-1'>
                            / {currencyFormatter.format(max)}
                        </span>)
                        }
                    </div> 
                </Card.Title>
                {max && (<ProgressBar 
                    className='rounded-pill' 
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />
                )}
                {!hideButtons && (
                <Stack direction='horizontal' gap={2} className='mt-4'>
                    <Button variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant='outline-secondary' onClick={onViewExpenseClick}>View Expenses</Button>
                </Stack>
                )}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount: number, max : number) {
    const percentage = amount / max * 100;
    if (percentage < 50) {
        return 'primary';
    } else if (percentage < 75) {
        return 'warning';
    } else {
        return 'danger';
    }
}

export default BudgetCard;