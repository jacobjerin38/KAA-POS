import React from 'react';
import { Home, Receipt, Settings } from 'lucide-react';

interface POSLayoutProps {
  children: React.ReactNode;
  cartComponent?: React.ReactNode;
  activeTab?: 'home' | 'orders' | 'settings';
  onTabChange?: (tab: 'home' | 'orders' | 'settings') => void;
}

export const POSLayout: React.FC<POSLayoutProps> = ({
  children,
  cartComponent,
  activeTab = 'home',
  onTabChange
}) => {
  return (
    <div className="pos-shell">
      {/* Left Sidebar - Minimal Navigation */}
      <aside className="pos-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">💰</div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => onTabChange?.('home')}
            title="Home"
          >
            <Home size={22} />
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => onTabChange?.('orders')}
            title="Orders"
          >
            <Receipt size={22} />
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => onTabChange?.('settings')}
            title="Settings"
          >
            <Settings size={22} />
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="pos-main">
        {children}
      </main>

      {/* Right Cart Panel */}
      {cartComponent}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .pos-shell {
          display: grid;
          grid-template-columns: 72px 1fr 420px;
          height: 100vh;
          width: 100vw;
          background: #f8f9fa;
          overflow: hidden;
        }

        .pos-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          background: white;
          border-right: 1px solid #e9ecef;
        }

        .sidebar-logo {
          margin-bottom: 2rem;
        }

        .logo-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          padding: 0 0.75rem;
        }

        .nav-item {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          color: #495057;
          background: transparent;
          border: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-item:hover {
          background: #f1f3f5;
          color: var(--color-primary);
        }

        .nav-item.active {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .pos-main {
          display: flex;
          flex-direction: column;
          background: white;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
