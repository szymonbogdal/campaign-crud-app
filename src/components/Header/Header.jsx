import { Target, DollarSign } from 'lucide-react';
import './Header.css';

const Header = ({ accountBalance}) => (
    <header className="header">
        <div className="container">
            <h1 className="logo">
                <Target className="logo-icon" />
                Campaign Manager
            </h1>
            <div className="account-info">
                <DollarSign size={20} />
                <span>Account balance: <strong>{accountBalance.toFixed(2)} zł</strong></span>
            </div>
        </div>
    </header>
);

export default Header;