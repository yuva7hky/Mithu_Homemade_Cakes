import { Minus, Plus } from 'lucide-react';

export const WeightSelector = ({ availableWeights, selectedWeight, onSelect, category }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-textMain">Select {category === 'brownies' ? 'Pack Size' : (category === 'treats' ? 'Pack' : 'Weight')}</h4>
      <div className="flex flex-wrap gap-3">
        {availableWeights.map((weight) => {
          let label = `${weight} KG`;
          if (weight === 0.25) label = "250g";
          if (weight === 1 && category === 'treats') label = "1 Pack";

          const isSelected = selectedWeight === weight;
          return (
            <button
              key={weight}
              onClick={() => onSelect(weight)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isSelected 
                  ? 'bg-primary text-white shadow-clay-pink scale-105' 
                  : 'bg-white text-textMuted border border-softPink hover:border-primary/50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-textMain">Quantity</h4>
      <div className="flex items-center space-x-4 bg-white border border-softPink rounded-full w-fit px-2 py-1 shadow-sm">
        <button 
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="p-2 text-textMuted hover:text-primary hover:bg-lightPink rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-textMuted"
        >
          <Minus size={18} />
        </button>
        <span className="w-8 text-center font-bold text-lg text-textMain">{quantity}</span>
        <button 
          onClick={onIncrease}
          className="p-2 text-textMuted hover:text-primary hover:bg-lightPink rounded-full transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};
