import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

const ScoreBreakdown = ({ scoreBreakdown = [], totalScore = 0 }) => {
  return (
    <div style={{ marginTop: '0.6rem' }}>
      <div className="score-breakdown-tags">
        {scoreBreakdown.map((item, idx) => {
          let styleClass = 'plus-2';
          if (item.points >= 5) styleClass = 'plus-5';
          else if (item.points === 4) styleClass = 'plus-4';
          else if (item.points === 3) styleClass = 'plus-3';

          return (
            <span
              key={idx}
              className={`score-tag ${styleClass}`}
              title={item.description}
            >
              <CheckCircle2 size={12} />
              <strong>+{item.points}</strong>
              <span>{item.rule}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
