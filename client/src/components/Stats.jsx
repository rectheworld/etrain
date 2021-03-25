import React from 'react';
import PercentageBar from './PercentageBar.jsx';

function Stats({preformaceMetrics}) {
  console.log(preformaceMetrics)
    let numEndorsedCohort = preformaceMetrics.num_endorsed_self? preformaceMetrics.num_endorsed_self : 0;
    let numEndorsedJuniors = preformaceMetrics.num_endorsed_junior? preformaceMetrics.num_endorsed_junior : 0;

    return (
        <div>
          You have endorsed <strong>{numEndorsedCohort}</strong> people in your cohort!
          <PercentageBar total={preformaceMetrics.num_cohort_self} endorsed={numEndorsedCohort}/>
          You have endorsed <strong>{numEndorsedJuniors}</strong> of your juniors!
          <PercentageBar total={preformaceMetrics.num_cohort_junior} endorsed={numEndorsedJuniors}/>
        </div>
    )
}

export default Stats;