import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { POSLayout } from './layout/POSLayout';
import { ProductGrid } from './features/pos/ProductGrid';
import { CartPanel } from './features/pos/CartPanel';
import { OrdersView, SettingsView } from './features/pos/Views';

const POSPage = () => {
  const [ready, setReady] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'home' | 'orders' | 'settings'>('home');

  React.useEffect(() => {
    const init = async () => {
      try {
        await import('./lib/db').then(m => m.db.seedStart());
      } catch (e) {
        console.error("Seeding failed", e);
      } finally {
        setReady(true);
      }
    };
    init();
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-muted)]">Loading POS...</p>
        </div>
      </div>
    );
  }

  return (
    <POSLayout
      cartComponent={<CartPanel />}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'home' && <ProductGrid />}
      {activeTab === 'orders' && <OrdersView />}
      {activeTab === 'settings' && <SettingsView />}
    </POSLayout>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<POSPage />} />
    </Routes>
  );
};

export default App;
