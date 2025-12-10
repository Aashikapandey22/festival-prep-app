import React, { useState, useEffect } from 'react';
import { FestivalType, ChecklistItem } from './types';
import { FESTIVAL_THEMES } from './constants';
import { generateFestivalPlan } from './services/geminiService';
import ThemeBackground from './components/ThemeBackground';
import Dashboard from './components/Dashboard';
import Hub from './components/Hub';

const App: React.FC = () => {
  const [selectedFestival, setSelectedFestival] = useState<FestivalType>('Default');
  const [familySize, setFamilySize] = useState<number>(4);
  const [budget, setBudget] = useState<number>(15000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [view, setView] = useState<'landing' | 'hub'>('landing');

  const theme = FESTIVAL_THEMES[selectedFestival] || FESTIVAL_THEMES['Default'];

  // Handle generating the plan
  const handleGenerate = async () => {
    setIsLoading(true);
    // Simulate minimum loading time for better UX feeling
    const [data] = await Promise.all([
      generateFestivalPlan(selectedFestival, familySize, budget),
      new Promise(resolve => setTimeout(resolve, 2000))
    ]);
    
    setChecklist(data);
    setIsLoading(false);
    setView('hub');
  };

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const handleAddExpense = (amount: number, category: string) => {
      // Logic handled in Hub locally for this demo, or lift state here if needed
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans selection:bg-white/30 text-slate-100`}>
      <ThemeBackground theme={theme} />
      
      {/* Navbar - Only show on Landing or minimal on Hub */}
      <nav className={`fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center pointer-events-none`}>
          <div className={`font-serif font-bold text-xl tracking-widest uppercase opacity-80 ${theme.colors.textMain} pointer-events-auto`}>
             Festival Buddy
          </div>
          {view === 'hub' && (
              <button 
                onClick={() => setView('landing')} 
                className="pointer-events-auto text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                  Reset
              </button>
          )}
      </nav>

      <main className="relative z-10 min-h-screen flex flex-col justify-center pt-20 pb-10 px-4">
        {view === 'landing' ? (
          <Dashboard 
            theme={theme}
            selectedFestival={selectedFestival}
            familySize={familySize}
            budget={budget}
            onFestivalChange={setSelectedFestival}
            onFamilySizeChange={setFamilySize}
            onBudgetChange={setBudget}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        ) : (
          <Hub 
            theme={theme}
            selectedFestival={selectedFestival}
            checklist={checklist}
            budget={budget}
            familySize={familySize}
            onToggleItem={toggleItem}
            onAddExpense={handleAddExpense}
          />
        )}
      </main>
    </div>
  );
};

export default App;
