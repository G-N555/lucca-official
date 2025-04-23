const fs = require('fs');
const path = require('path');

const coverageFile = path.join(__dirname, '../coverage/coverage-final.json');

try {
  const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
  
  let totalStatements = 0;
  let coveredStatements = 0;
  let totalBranches = 0;
  let coveredBranches = 0;
  let totalFunctions = 0;
  let coveredFunctions = 0;
  let totalLines = 0;
  let coveredLines = 0;
  
  Object.values(coverage).forEach(file => {
    totalStatements += file.statementMap ? Object.keys(file.statementMap).length : 0;
    coveredStatements += file.s ? Object.values(file.s).filter(v => v > 0).length : 0;
    
    totalBranches += file.branchMap ? Object.keys(file.branchMap).length * 2 : 0;
    coveredBranches += file.b ? Object.values(file.b).flat().filter(v => v > 0).length : 0;
    
    totalFunctions += file.fnMap ? Object.keys(file.fnMap).length : 0;
    coveredFunctions += file.f ? Object.values(file.f).filter(v => v > 0).length : 0;
    
    totalLines += file.lineMap ? Object.keys(file.lineMap).length : 0;
    coveredLines += file.l ? Object.values(file.l).filter(v => v > 0).length : 0;
  });
  
  const report = `
# Coverage Report

| Type | Coverage |
| ---- | -------- |
| Statements | ${coveredStatements}/${totalStatements} (${Math.round(coveredStatements / totalStatements * 100) || 0}%) |
| Branches | ${coveredBranches}/${totalBranches} (${Math.round(coveredBranches / totalBranches * 100) || 0}%) |
| Functions | ${coveredFunctions}/${totalFunctions} (${Math.round(coveredFunctions / totalFunctions * 100) || 0}%) |
| Lines | ${coveredLines}/${totalLines} (${Math.round(coveredLines / totalLines * 100) || 0}%) |

`;
  
  fs.writeFileSync(path.join(__dirname, '../coverage/report.md'), report);
  console.log('Generated coverage report');
} catch (err) {
  console.error('Error generating coverage report:', err);
}
