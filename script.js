// Global variables
let variables = [];
let currentFormula = '';
let formulaHistory = [];
let variables2 = [];
let formulaHistory2 = [];
let variables3 = [];
let formulaHistory3A = [];
let formulaHistory3B = [];

// Section navigation
function showSection(sectionName) {
    // Hide all sections
    document.getElementById('truthTableSection').classList.add('hidden');
    document.getElementById('tautologyCheckSection').classList.add('hidden');
    document.getElementById('equivalenceCheckSection').classList.add('hidden');
    
    // Reset button styles
    document.getElementById('truthTableBtn').className = 'block bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-3 rounded-lg transition duration-200 text-sm';
    document.getElementById('tautologyCheckBtn').className = 'block bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-3 rounded-lg transition duration-200 text-sm';
    document.getElementById('equivalenceCheckBtn').className = 'block bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-3 rounded-lg transition duration-200 text-sm';
    
    // Show selected section and highlight button
    if (sectionName === 'truthTable') {
        document.getElementById('truthTableSection').classList.remove('hidden');
        document.getElementById('truthTableBtn').className = 'block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg transition duration-200 text-sm';
    } else if (sectionName === 'tautologyCheck') {
        document.getElementById('tautologyCheckSection').classList.remove('hidden');
        document.getElementById('tautologyCheckBtn').className = 'block bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-3 rounded-lg transition duration-200 text-sm';
    } else if (sectionName === 'equivalenceCheck') {
        document.getElementById('equivalenceCheckSection').classList.remove('hidden');
        document.getElementById('equivalenceCheckBtn').className = 'block bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-3 rounded-lg transition duration-200 text-sm';
    }
}

// Truth Table Section Functions (Section 1)
function addVariable() {
    const input = document.getElementById('newVariable');
    const variableName = input.value.trim().toUpperCase();
    
    if (!variableName) {
        alert('กรุณากรอกชื่อตัวแปร');
        return;
    }
    
    if (!/^[A-Z]+$/.test(variableName)) {
        alert('ชื่อตัวแปรต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น');
        return;
    }
    
    if (variables.includes(variableName)) {
        alert('ตัวแปรนี้มีอยู่แล้ว');
        return;
    }
    
    variables.push(variableName);
    input.value = '';
    updateVariablesDisplay();
    updateVariableButtons();
}

function clearVariables() {
    variables = [];
    formulaHistory = [];
    document.getElementById('formulaInput').value = '';
    updateVariablesDisplay();
    updateVariableButtons();
    document.getElementById('truthTableContainer').classList.add('hidden');
}

function updateVariablesDisplay() {
    const container = document.getElementById('variablesList');
    if (variables.length === 0) {
        container.innerHTML = '<span class="text-gray-400 text-sm">ยังไม่มีตัวแปร - เพิ่มตัวแปรเพื่อเริ่มต้น</span>';
    } else {
        container.innerHTML = variables.map(variable => 
            `<span class="variable-tag bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                ${variable}
                <button onclick="removeVariable('${variable}')" class="ml-2 text-blue-600 hover:text-blue-800">×</button>
            </span>`
        ).join('');
    }
}

function updateVariableButtons() {
    const container = document.getElementById('variableButtons');
    if (variables.length === 0) {
        container.innerHTML = '<span class="text-gray-400 text-sm">เพิ่มตัวแปรก่อนเพื่อแสดงปุ่ม</span>';
    } else {
        container.innerHTML = variables.map(variable => 
            `<button onclick="addToFormula('${variable}')" 
                     class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
                ${variable}
            </button>`
        ).join('');
    }
}

function removeVariable(variableName) {
    variables = variables.filter(v => v !== variableName);
    // Remove from current formula if exists
    const input = document.getElementById('formulaInput');
    input.value = input.value.replace(new RegExp(`\\b${variableName}\\b`, 'g'), '').replace(/\s+/g, ' ').trim();
    updateVariablesDisplay();
    updateVariableButtons();
}

function addToFormula(text) {
    const input = document.getElementById('formulaInput');
    const currentPos = input.selectionStart;
    const currentValue = input.value;
    
    formulaHistory.push(currentValue);
    const newValue = currentValue.slice(0, currentPos) + text + currentValue.slice(currentPos);
    input.value = newValue;
    
    // Set cursor position after inserted text
    const newPos = currentPos + text.length;
    input.setSelectionRange(newPos, newPos);
    input.focus();
}

function clearFormula() {
    const input = document.getElementById('formulaInput');
    formulaHistory.push(input.value);
    input.value = '';
    input.focus();
}

function undoLastAction() {
    if (formulaHistory.length > 0) {
        const input = document.getElementById('formulaInput');
        input.value = formulaHistory.pop();
        input.focus();
    }
}

function getCurrentFormula() {
    return document.getElementById('formulaInput').value.trim();
}

// Tautology Check Section Functions (Section 2)
function addVariable2() {
    const input = document.getElementById('newVariable2');
    const variableName = input.value.trim().toUpperCase();
    
    if (!variableName) {
        alert('กรุณากรอกชื่อตัวแปร');
        return;
    }
    
    if (!/^[A-Z]+$/.test(variableName)) {
        alert('ชื่อตัวแปรต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น');
        return;
    }
    
    if (variables2.includes(variableName)) {
        alert('ตัวแปรนี้มีอยู่แล้ว');
        return;
    }
    
    variables2.push(variableName);
    input.value = '';
    updateVariablesDisplay2();
    updateVariableButtons2();
}

function clearVariables2() {
    variables2 = [];
    formulaHistory2 = [];
    document.getElementById('formulaInput2').value = '';
    updateVariablesDisplay2();
    updateVariableButtons2();
    document.getElementById('tautologyResultContainer').classList.add('hidden');
}

function updateVariablesDisplay2() {
    const container = document.getElementById('variablesList2');
    if (variables2.length === 0) {
        container.innerHTML = '<span class="text-gray-400 text-sm">ยังไม่มีตัวแปร - เพิ่มตัวแปรเพื่อเริ่มต้น</span>';
    } else {
        container.innerHTML = variables2.map(variable => 
            `<span class="variable-tag bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                ${variable}
                <button onclick="removeVariable2('${variable}')" class="ml-2 text-blue-600 hover:text-blue-800">×</button>
            </span>`
        ).join('');
    }
}

function updateVariableButtons2() {
    const container = document.getElementById('variableButtons2');
    if (variables2.length === 0) {
        container.innerHTML = '<span class="text-gray-400 text-sm">เพิ่มตัวแปรก่อนเพื่อแสดงปุ่ม</span>';
    } else {
        container.innerHTML = variables2.map(variable => 
            `<button onclick="addToFormula2('${variable}')" 
                     class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
                ${variable}
            </button>`
        ).join('');
    }
}

function removeVariable2(variableName) {
    variables2 = variables2.filter(v => v !== variableName);
    const input = document.getElementById('formulaInput2');
    input.value = input.value.replace(new RegExp(`\\b${variableName}\\b`, 'g'), '').replace(/\s+/g, ' ').trim();
    updateVariablesDisplay2();
    updateVariableButtons2();
}

function addToFormula2(text) {
    const input = document.getElementById('formulaInput2');
    const currentPos = input.selectionStart;
    const currentValue = input.value;
    
    formulaHistory2.push(currentValue);
    const newValue = currentValue.slice(0, currentPos) + text + currentValue.slice(currentPos);
    input.value = newValue;
    
    const newPos = currentPos + text.length;
    input.setSelectionRange(newPos, newPos);
    input.focus();
}

function clearFormula2() {
    const input = document.getElementById('formulaInput2');
    formulaHistory2.push(input.value);
    input.value = '';
    input.focus();
}

function undoLastAction2() {
    if (formulaHistory2.length > 0) {
        const input = document.getElementById('formulaInput2');
        input.value = formulaHistory2.pop();
        input.focus();
    }
}

function getCurrentFormula2() {
    return document.getElementById('formulaInput2').value.trim();
}

// Equivalence Check Section Functions (Section 3)
function addVariable3() {
    const input = document.getElementById('newVariable3');
    const variableName = input.value.trim().toUpperCase();
    
    if (!variableName) {
        alert('กรุณากรอกชื่อตัวแปร');
        return;
    }
    
    if (!/^[A-Z]+$/.test(variableName)) {
        alert('ชื่อตัวแปรต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น');
        return;
    }
    
    if (variables3.includes(variableName)) {
        alert('ตัวแปรนี้มีอยู่แล้ว');
        return;
    }
    
    variables3.push(variableName);
    input.value = '';
    updateVariablesDisplay3();
    updateVariableButtons3();
}

function clearVariables3() {
    variables3 = [];
    formulaHistory3A = [];
    formulaHistory3B = [];
    document.getElementById('formulaInput3A').value = '';
    document.getElementById('formulaInput3B').value = '';
    updateVariablesDisplay3();
    updateVariableButtons3();
    document.getElementById('equivalenceResultContainer').classList.add('hidden');
}

function updateVariablesDisplay3() {
    const container = document.getElementById('variablesList3');
    if (variables3.length === 0) {
        container.innerHTML = '<span class="text-gray-400 text-sm">ยังไม่มีตัวแปร - เพิ่มตัวแปรเพื่อเริ่มต้น</span>';
    } else {
        container.innerHTML = variables3.map(variable => 
            `<span class="variable-tag bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                ${variable}
                <button onclick="removeVariable3('${variable}')" class="ml-2 text-blue-600 hover:text-blue-800">×</button>
            </span>`
        ).join('');
    }
}

function updateVariableButtons3() {
    const container = document.getElementById('variableButtons3');
    if (variables3.length === 0) {
        container.innerHTML = '<span class="text-gray-400 text-sm">เพิ่มตัวแปรก่อนเพื่อแสดงปุ่ม</span>';
    } else {
        container.innerHTML = variables3.map(variable => 
            `<button onclick="addToSelectedFormula('${variable}')" 
                     class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
                ${variable}
            </button>`
        ).join('');
    }
}

function removeVariable3(variableName) {
    variables3 = variables3.filter(v => v !== variableName);
    const inputA = document.getElementById('formulaInput3A');
    const inputB = document.getElementById('formulaInput3B');
    inputA.value = inputA.value.replace(new RegExp(`\\b${variableName}\\b`, 'g'), '').replace(/\s+/g, ' ').trim();
    inputB.value = inputB.value.replace(new RegExp(`\\b${variableName}\\b`, 'g'), '').replace(/\s+/g, ' ').trim();
    updateVariablesDisplay3();
    updateVariableButtons3();
}

function addToSelectedFormula(text) {
    // Get the selected radio button
    const selectedTarget = document.querySelector('input[name="formulaTarget"]:checked').value;
    
    let activeInput;
    if (selectedTarget === 'A') {
        activeInput = document.getElementById('formulaInput3A');
    } else {
        activeInput = document.getElementById('formulaInput3B');
    }
    
    const currentPos = activeInput.selectionStart || activeInput.value.length;
    const currentValue = activeInput.value;
    
    // Save to appropriate history
    if (selectedTarget === 'A') {
        formulaHistory3A.push(currentValue);
    } else {
        formulaHistory3B.push(currentValue);
    }
    
    const newValue = currentValue.slice(0, currentPos) + text + currentValue.slice(currentPos);
    activeInput.value = newValue;
    
    const newPos = currentPos + text.length;
    activeInput.setSelectionRange(newPos, newPos);
    activeInput.focus();
}

function clearFormula3A() {
    const input = document.getElementById('formulaInput3A');
    formulaHistory3A.push(input.value);
    input.value = '';
    input.focus();
}

function undoLastAction3A() {
    if (formulaHistory3A.length > 0) {
        const input = document.getElementById('formulaInput3A');
        input.value = formulaHistory3A.pop();
        input.focus();
    }
}

function clearFormula3B() {
    const input = document.getElementById('formulaInput3B');
    formulaHistory3B.push(input.value);
    input.value = '';
    input.focus();
}

function undoLastAction3B() {
    if (formulaHistory3B.length > 0) {
        const input = document.getElementById('formulaInput3B');
        input.value = formulaHistory3B.pop();
        input.focus();
    }
}

function getCurrentFormula3A() {
    return document.getElementById('formulaInput3A').value.trim();
}

function getCurrentFormula3B() {
    return document.getElementById('formulaInput3B').value.trim();
}

// Core Logic Functions
function parseVariables(variableArray) {
    return variableArray;
}

function generateCombinations(variables) {
    const n = variables.length;
    const combinations = [];
    
    for (let i = 0; i < Math.pow(2, n); i++) {
        const combination = {};
        for (let j = 0; j < n; j++) {
            combination[variables[j]] = Boolean(i & (1 << (n - 1 - j)));
        }
        combinations.push(combination);
    }
    
    return combinations;
}

function parseFormulaSteps(formula) {
    // Parse the formula to identify sub-expressions and their evaluation order
    const steps = [];
    let currentFormula = formula;
    
    // Find all sub-expressions (variables, negations, binary operations)
    const findSubExpressions = (expr) => {
        const subExprs = new Set();
        
        // Add individual variables
        const variables = expr.match(/\b[A-Z]+\b/g) || [];
        variables.forEach(v => subExprs.add(v));
        
        // Add negations
        const negations = expr.match(/¬[A-Z]+/g) || [];
        negations.forEach(n => subExprs.add(n));
        
        // Add parenthesized expressions
        let depth = 0;
        let start = -1;
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === '(' || expr[i] === '{') {
                if (depth === 0) start = i;
                depth++;
            } else if (expr[i] === ')' || expr[i] === '}') {
                depth--;
                if (depth === 0 && start !== -1) {
                    const parenExpr = expr.substring(start + 1, i);
                    if (parenExpr.match(/[∧∨→↔]/)) {
                        subExprs.add(parenExpr);
                    }
                }
            }
        }
        
        // Add binary operations (without parentheses)
        const binaryOps = ['↔', '→', '∨', '∧'];
        for (const op of binaryOps) {
            const regex = new RegExp(`([^(){}]+)\\${op}([^(){}]+)`, 'g');
            let match;
            while ((match = regex.exec(expr)) !== null) {
                const fullExpr = match[0].trim();
                if (!fullExpr.includes('(') && !fullExpr.includes(')') && !fullExpr.includes('{') && !fullExpr.includes('}')) {
                    subExprs.add(fullExpr);
                }
            }
        }
        
        return Array.from(subExprs).sort((a, b) => {
            // Sort by complexity (variables first, then simple operations, then complex)
            if (a.match(/^[A-Z]+$/) && !b.match(/^[A-Z]+$/)) return -1;
            if (!a.match(/^[A-Z]+$/) && b.match(/^[A-Z]+$/)) return 1;
            if (a.startsWith('¬') && !b.startsWith('¬')) return -1;
            if (!a.startsWith('¬') && b.startsWith('¬')) return 1;
            return a.length - b.length;
        });
    };
    
    return findSubExpressions(formula);
}

function evaluateFormula(formula, values) {
    try {
        return evaluateFormulaWithPrecedence(formula, values);
    } catch (error) {
        throw new Error('สูตรไม่ถูกต้อง: ' + error.message);
    }
}

function evaluateFormulaWithPrecedence(formula, values) {
    // Replace variables with their values first
    let expr = formula;
    for (const [variable, value] of Object.entries(values)) {
        const regex = new RegExp(`\\b${variable}\\b`, 'g');
        expr = expr.replace(regex, value ? 'T' : 'F');
    }

    // Parse and evaluate with proper precedence
    return parseExpression(expr);
}

function parseExpression(expr) {
    expr = expr.trim();
    return parseEquivalence(expr);
}

function parseEquivalence(expr) {
    const parts = [];
    let current = '';
    let depth = 0;
    
    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        if ((char === '(' || char === '{')) depth++;
        else if ((char === ')' || char === '}')) depth--;
        else if (char === '↔' && depth === 0) {
            parts.push(current.trim());
            parts.push('↔');
            current = '';
            continue;
        }
        current += char;
    }
    parts.push(current.trim());

    if (parts.length === 1) {
        return parseImplication(parts[0]);
    }

    let result = parseImplication(parts[0]);
    for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const right = parseImplication(parts[i + 1]);
        if (operator === '↔') {
            result = (result === right);
        }
    }
    return result;
}

function parseImplication(expr) {
    const parts = [];
    let current = '';
    let depth = 0;
    
    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        if ((char === '(' || char === '{')) depth++;
        else if ((char === ')' || char === '}')) depth--;
        else if (char === '→' && depth === 0) {
            parts.push(current.trim());
            parts.push('→');
            current = '';
            continue;
        }
        current += char;
    }
    parts.push(current.trim());

    if (parts.length === 1) {
        return parseDisjunction(parts[0]);
    }

    // Right associative for implication
    let result = parseDisjunction(parts[parts.length - 1]);
    for (let i = parts.length - 3; i >= 0; i -= 2) {
        const left = parseDisjunction(parts[i]);
        result = (!left || result);
    }
    return result;
}

function parseDisjunction(expr) {
    const parts = [];
    let current = '';
    let depth = 0;
    
    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        if ((char === '(' || char === '{')) depth++;
        else if ((char === ')' || char === '}')) depth--;
        else if (char === '∨' && depth === 0) {
            parts.push(current.trim());
            parts.push('∨');
            current = '';
            continue;
        }
        current += char;
    }
    parts.push(current.trim());

    if (parts.length === 1) {
        return parseConjunction(parts[0]);
    }

    let result = parseConjunction(parts[0]);
    for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const right = parseConjunction(parts[i + 1]);
        if (operator === '∨') {
            result = (result || right);
        }
    }
    return result;
}

function parseConjunction(expr) {
    const parts = [];
    let current = '';
    let depth = 0;
    
    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        if ((char === '(' || char === '{')) depth++;
        else if ((char === ')' || char === '}')) depth--;
        else if (char === '∧' && depth === 0) {
            parts.push(current.trim());
            parts.push('∧');
            current = '';
            continue;
        }
        current += char;
    }
    parts.push(current.trim());

    if (parts.length === 1) {
        return parseNegation(parts[0]);
    }

    let result = parseNegation(parts[0]);
    for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const right = parseNegation(parts[i + 1]);
        if (operator === '∧') {
            result = (result && right);
        }
    }
    return result;
}

function parseNegation(expr) {
    expr = expr.trim();
    if (expr.startsWith('¬')) {
        return !parseAtom(expr.substring(1));
    }
    return parseAtom(expr);
}

function parseAtom(expr) {
    expr = expr.trim();
    
    // Handle parentheses and curly braces
    if ((expr.startsWith('(') && expr.endsWith(')')) || 
        (expr.startsWith('{') && expr.endsWith('}'))) {
        return parseExpression(expr.substring(1, expr.length - 1));
    }
    
    // Handle boolean values
    if (expr === 'T') return true;
    if (expr === 'F') return false;
    
    throw new Error('Invalid expression: ' + expr);
}

function evaluateSubExpression(expr, values) {
    try {
        return evaluateFormula(expr, values);
    } catch (error) {
        return null;
    }
}

// Main Functions
function generateTruthTable() {
    if (variables.length === 0) {
        alert('กรุณาเพิ่มตัวแปรก่อน');
        return;
    }

    const currentFormula = getCurrentFormula();
    if (!currentFormula) {
        alert('กรุณาสร้างสูตรตรรกะก่อน');
        return;
    }

    // Validate that all variables in the formula exist
    const usedVariables = currentFormula.match(/\b[A-Z]+\b/g) || [];
    const missingVariables = usedVariables.filter(v => !variables.includes(v));
    
    if (missingVariables.length > 0) {
        alert(`ตัวแปรเหล่านี้ยังไม่ได้เพิ่ม: ${missingVariables.join(', ')}\nกรุณาเพิ่มตัวแปรก่อนใช้สูตร`);
        return;
    }

    // Basic validation for logical symbols
    const validSymbols = ['∧', '∨', '¬', '→', '↔', '(', ')', '{', '}'];
    const invalidChars = currentFormula.split('').filter(char => 
        !char.match(/[A-Z\s]/) && !validSymbols.includes(char)
    );
    
    if (invalidChars.length > 0) {
        alert(`พบสัญลักษณ์ที่ไม่รองรับ: ${[...new Set(invalidChars)].join(', ')}\nกรุณาใช้เฉพาะสัญลักษณ์ตรรกศาสตร์ที่กำหนด`);
        return;
    }

    try {
        const combinations = generateCombinations(variables);
        const subExpressions = parseFormulaSteps(currentFormula);
        
        // Create table header
        const tableHead = document.getElementById('tableHead');
        const tableBody = document.getElementById('tableBody');
        
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';

        const headerRow = document.createElement('tr');
        
        // Add variable columns
        variables.forEach(variable => {
            const th = document.createElement('th');
            th.textContent = variable;
            th.className = 'px-4 py-3 text-center font-semibold border-r border-gray-600 bg-gray-700';
            headerRow.appendChild(th);
        });

        // Add sub-expression columns
        subExpressions.forEach((subExpr, index) => {
            if (!variables.includes(subExpr)) { // Don't duplicate variable columns
                const th = document.createElement('th');
                th.textContent = subExpr;
                th.className = 'px-3 py-3 text-center font-semibold border-r border-gray-600 bg-gray-600 text-sm';
                headerRow.appendChild(th);
            }
        });

        // Add final formula column only if it's different from existing columns
        const shouldShowFinalColumn = !variables.includes(currentFormula) && !subExpressions.includes(currentFormula);
        if (shouldShowFinalColumn) {
            const formulaTh = document.createElement('th');
            formulaTh.textContent = currentFormula;
            formulaTh.className = 'px-4 py-3 text-center font-semibold bg-blue-700 text-sm';
            headerRow.appendChild(formulaTh);
        }

        tableHead.appendChild(headerRow);

        // Generate table rows
        let allTrue = true;
        let allFalse = true;
        let truthValues = [];

        combinations.forEach((combination, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

            // Add variable values
            variables.forEach((variable, varIndex) => {
                const td = document.createElement('td');
                const value = combination[variable];
                td.textContent = value ? 'T' : 'F';
                td.className = `px-4 py-3 text-center font-medium ${value ? 'text-green-600' : 'text-red-600'} ${varIndex < variables.length - 1 ? 'border-r border-gray-200' : ''} border-r border-gray-200`;
                row.appendChild(td);
            });

            // Add sub-expression values
            subExpressions.forEach((subExpr, subIndex) => {
                if (!variables.includes(subExpr)) { // Don't duplicate variable columns
                    const td = document.createElement('td');
                    const result = evaluateSubExpression(subExpr, combination);
                    td.textContent = result ? 'T' : 'F';
                    td.className = `px-3 py-3 text-center font-medium ${result ? 'text-blue-600' : 'text-orange-600'} border-r border-gray-200 bg-gray-50`;
                    row.appendChild(td);
                }
            });

            // Calculate and add final formula result only if column was added
            const finalResult = evaluateFormula(currentFormula, combination);
            if (shouldShowFinalColumn) {
                const resultTd = document.createElement('td');
                resultTd.textContent = finalResult ? 'T' : 'F';
                resultTd.className = `px-4 py-3 text-center font-bold text-lg ${finalResult ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} border-l-2 ${finalResult ? 'border-green-300' : 'border-red-300'}`;
                row.appendChild(resultTd);
            }

            tableBody.appendChild(row);

            // Track for analysis - use the final result regardless of column display
            truthValues.push(finalResult ? 'T' : 'F');
            if (!finalResult) allTrue = false;
            if (finalResult) allFalse = false;
        });

        // Show the truth table
        document.getElementById('truthTableContainer').classList.remove('hidden');
        
        // Scroll to results
        document.getElementById('truthTableContainer').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

function quickTautologyCheck2() {
    if (variables2.length === 0) {
        alert('กรุณาเพิ่มตัวแปรก่อน');
        return;
    }

    const currentFormula = getCurrentFormula2();
    if (!currentFormula) {
        alert('กรุณาสร้างสูตรตรรกะก่อน');
        return;
    }

    const usedVariables = currentFormula.match(/\b[A-Z]+\b/g) || [];
    const missingVariables = usedVariables.filter(v => !variables2.includes(v));
    
    if (missingVariables.length > 0) {
        alert(`ตัวแปรเหล่านี้ยังไม่ได้เพิ่ม: ${missingVariables.join(', ')}\nกรุณาเพิ่มตัวแปรก่อนใช้สูตร`);
        return;
    }

    try {
        const combinations = generateCombinations(variables2);
        const subExpressions = parseFormulaSteps(currentFormula);
        let allTrue = true;
        let allFalse = true;
        let truthValues = [];

        // Create table header
        const tableHead = document.getElementById('tautologyTableHead');
        const tableBody = document.getElementById('tautologyTableBody');
        
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';

        const headerRow = document.createElement('tr');
        
        // Add variable columns
        variables2.forEach(variable => {
            const th = document.createElement('th');
            th.textContent = variable;
            th.className = 'px-4 py-3 text-center font-semibold border-r border-gray-600 bg-gray-700';
            headerRow.appendChild(th);
        });

        // Add sub-expression columns
        subExpressions.forEach((subExpr, index) => {
            if (!variables2.includes(subExpr)) {
                const th = document.createElement('th');
                th.textContent = subExpr;
                th.className = 'px-3 py-3 text-center font-semibold border-r border-gray-600 bg-gray-600 text-sm';
                headerRow.appendChild(th);
            }
        });

        // Add final formula column
        const shouldShowFinalColumn = !variables2.includes(currentFormula) && !subExpressions.includes(currentFormula);
        if (shouldShowFinalColumn) {
            const formulaTh = document.createElement('th');
            formulaTh.textContent = currentFormula;
            formulaTh.className = 'px-4 py-3 text-center font-semibold bg-blue-700 text-sm';
            headerRow.appendChild(formulaTh);
        }

        tableHead.appendChild(headerRow);

        // Generate table rows
        combinations.forEach((combination, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

            // Add variable values
            variables2.forEach((variable, varIndex) => {
                const td = document.createElement('td');
                const value = combination[variable];
                td.textContent = value ? 'T' : 'F';
                td.className = `px-4 py-3 text-center font-medium ${value ? 'text-green-600' : 'text-red-600'} border-r border-gray-200`;
                row.appendChild(td);
            });

            // Add sub-expression values
            subExpressions.forEach((subExpr, subIndex) => {
                if (!variables2.includes(subExpr)) {
                    const td = document.createElement('td');
                    const result = evaluateSubExpression(subExpr, combination);
                    td.textContent = result ? 'T' : 'F';
                    td.className = `px-3 py-3 text-center font-medium ${result ? 'text-blue-600' : 'text-orange-600'} border-r border-gray-200 bg-gray-50`;
                    row.appendChild(td);
                }
            });

            // Calculate and add final formula result
            const finalResult = evaluateFormula(currentFormula, combination);
            if (shouldShowFinalColumn) {
                const resultTd = document.createElement('td');
                resultTd.textContent = finalResult ? 'T' : 'F';
                resultTd.className = `px-4 py-3 text-center font-bold text-lg ${finalResult ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} border-l-2 ${finalResult ? 'border-green-300' : 'border-red-300'}`;
                row.appendChild(resultTd);
            }

            tableBody.appendChild(row);

            // Track for analysis
            truthValues.push(finalResult ? 'T' : 'F');
            if (!finalResult) allTrue = false;
            if (finalResult) allFalse = false;
        });

        const truthPattern = truthValues.join(' ');
        document.getElementById('tautologyTruthPattern').innerHTML = truthPattern.split('').map(char => 
            char === 'T' ? `<span class="text-green-400">${char}</span>` : 
            char === 'F' ? `<span class="text-red-400">${char}</span>` : char
        ).join('');

        const classificationDiv = document.getElementById('tautologyFormulaClassification');
        if (allTrue) {
            classificationDiv.textContent = '🟢 สูตรนี้เป็น TAUTOLOGY (สัจนิรันดร์)';
            classificationDiv.className = 'text-center p-4 rounded-lg font-bold text-xl bg-green-700 text-green-100 border-2 border-green-500';
        } else if (allFalse) {
            classificationDiv.textContent = '🔴 สูตรนี้เป็น CONTRADICTION (ขัดแย้ง)';
            classificationDiv.className = 'text-center p-4 rounded-lg font-bold text-xl bg-red-700 text-red-100 border-2 border-red-500';
        } else {
            classificationDiv.textContent = '❌ สูตรนี้ไม่ใช่ TAUTOLOGY หรือ CONTRADICTION';
            classificationDiv.className = 'text-center p-4 rounded-lg font-bold text-xl bg-gray-700 text-gray-100 border-2 border-gray-500';
        }

        // Show analysis in the 2 boxes
        document.getElementById('tautologyResult2').textContent = allTrue ? 'ใช่ - สูตรนี้เป็นสัจนิรันดร์' : 'ไม่ใช่ - มีกรณีที่เป็นเท็จ';
        document.getElementById('contradictionResult2').textContent = allFalse ? 'ใช่ - สูตรนี้ขัดแย้ง' : 'ไม่ใช่ - มีกรณีที่เป็นจริง';

        document.getElementById('tautologyResultContainer').classList.remove('hidden');
        document.getElementById('tautologyResultContainer').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

function checkEquivalence() {
    if (variables3.length === 0) {
        alert('กรุณาเพิ่มตัวแปรก่อน');
        return;
    }

    const formula1 = getCurrentFormula3A();
    const formula2 = getCurrentFormula3B();
    
    if (!formula1 || !formula2) {
        alert('กรุณาสร้างสูตรตรรกะทั้งสองสูตร');
        return;
    }

    // Validate that all variables in both formulas exist
    const usedVariables1 = formula1.match(/\b[A-Z]+\b/g) || [];
    const usedVariables2 = formula2.match(/\b[A-Z]+\b/g) || [];
    const allUsedVariables = [...new Set([...usedVariables1, ...usedVariables2])];
    const missingVariables = allUsedVariables.filter(v => !variables3.includes(v));
    
    if (missingVariables.length > 0) {
        alert(`ตัวแปรเหล่านี้ยังไม่ได้เพิ่ม: ${missingVariables.join(', ')}\nกรุณาเพิ่มตัวแปรก่อนใช้สูตร`);
        return;
    }

    try {
        const combinations = generateCombinations(variables3);
        let isEquivalent = true;
        let formula1Values = [];
        let formula2Values = [];

        // Create table header
        const tableHead = document.getElementById('equivalenceTableHead');
        const tableBody = document.getElementById('equivalenceTableBody');
        
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';

        const headerRow = document.createElement('tr');
        
        // Add variable columns
        variables3.forEach(variable => {
            const th = document.createElement('th');
            th.textContent = variable;
            th.className = 'px-4 py-3 text-center font-semibold border-r border-gray-600 bg-gray-700';
            headerRow.appendChild(th);
        });

        // Add formula columns
        const formula1Th = document.createElement('th');
        formula1Th.textContent = formula1;
        formula1Th.className = 'px-4 py-3 text-center font-semibold border-r border-gray-600 bg-blue-700 text-sm';
        headerRow.appendChild(formula1Th);

        const formula2Th = document.createElement('th');
        formula2Th.textContent = formula2;
        formula2Th.className = 'px-4 py-3 text-center font-semibold border-r border-gray-600 bg-green-700 text-sm';
        headerRow.appendChild(formula2Th);

        const equivalentTh = document.createElement('th');
        equivalentTh.textContent = 'เท่ากัน?';
        equivalentTh.className = 'px-4 py-3 text-center font-semibold bg-purple-700';
        headerRow.appendChild(equivalentTh);

        tableHead.appendChild(headerRow);

        // Generate table rows
        combinations.forEach((combination, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

            // Add variable values
            variables3.forEach((variable, varIndex) => {
                const td = document.createElement('td');
                const value = combination[variable];
                td.textContent = value ? 'T' : 'F';
                td.className = `px-4 py-3 text-center font-medium ${value ? 'text-green-600' : 'text-red-600'} border-r border-gray-200`;
                row.appendChild(td);
            });

            // Calculate formula results
            const result1 = evaluateFormula(formula1, combination);
            const result2 = evaluateFormula(formula2, combination);
            
            formula1Values.push(result1 ? 'T' : 'F');
            formula2Values.push(result2 ? 'T' : 'F');

            // Add formula 1 result
            const result1Td = document.createElement('td');
            result1Td.textContent = result1 ? 'T' : 'F';
            result1Td.className = `px-4 py-3 text-center font-bold ${result1 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} border-r border-gray-200`;
            row.appendChild(result1Td);

            // Add formula 2 result
            const result2Td = document.createElement('td');
            result2Td.textContent = result2 ? 'T' : 'F';
            result2Td.className = `px-4 py-3 text-center font-bold ${result2 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} border-r border-gray-200`;
            row.appendChild(result2Td);

            // Add equivalence check
            const isRowEquivalent = result1 === result2;
            if (!isRowEquivalent) isEquivalent = false;
            
            const equivalentTd = document.createElement('td');
            equivalentTd.textContent = isRowEquivalent ? '✓' : '✗';
            equivalentTd.className = `px-4 py-3 text-center font-bold text-lg ${isRowEquivalent ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`;
            row.appendChild(equivalentTd);

            tableBody.appendChild(row);
        });

        // Display patterns
        const pattern1 = formula1Values.join(' ');
        const pattern2 = formula2Values.join(' ');
        
        document.getElementById('formula1Pattern').innerHTML = pattern1.split('').map(char => 
            char === 'T' ? `<span class="text-green-400">${char}</span>` : 
            char === 'F' ? `<span class="text-red-400">${char}</span>` : char
        ).join('');

        document.getElementById('formula2Pattern').innerHTML = pattern2.split('').map(char => 
            char === 'T' ? `<span class="text-green-400">${char}</span>` : 
            char === 'F' ? `<span class="text-red-400">${char}</span>` : char
        ).join('');

        // Display equivalence result
        const resultDiv = document.getElementById('equivalenceResult');
        if (isEquivalent) {
            resultDiv.textContent = '✅ สูตรทั้งสองสมมูลกัน (Equivalent)';
            resultDiv.className = 'text-center p-4 rounded-lg font-bold text-xl bg-green-700 text-green-100 border-2 border-green-500';
        } else {
            resultDiv.textContent = '❌ สูตรทั้งสองไม่สมมูลกัน (Not Equivalent)';
            resultDiv.className = 'text-center p-4 rounded-lg font-bold text-xl bg-red-700 text-red-100 border-2 border-red-500';
        }

        // Show the result container
        document.getElementById('equivalenceResultContainer').classList.remove('hidden');
        
        // Scroll to results
        document.getElementById('equivalenceResultContainer').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to add variable
    document.getElementById('newVariable').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addVariable();
        }
    });

    document.getElementById('newVariable2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addVariable2();
        }
    });

    document.getElementById('newVariable3').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addVariable3();
        }
    });

    // Initialize
    showSection('truthTable'); // Show truth table section by default
});
// ==========================================
// 1. ส่วนเชื่อมต่อ Firebase (Visitor Counter)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxIgf1_ttc1IMUvEPTkAwa09KkReHxd4M",
  authDomain: "forlogic-d98b1.firebaseapp.com",
  databaseURL: "https://forlogic-d98b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "forlogic-d98b1",
  storageBucket: "forlogic-d98b1.firebasestorage.app",
  messagingSenderId: "299599436273",
  appId: "1:299599436273:web:93b19bedd1535c6e27cc50",
  measurementId: "G-DDVQG8SYLC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const visitorRef = ref(db, 'stats/visitorCount');

function setupVisitorCounter() {
    if (!sessionStorage.getItem('v_counted')) {
        runTransaction(visitorRef, (current) => (current || 0) + 1)
        .then(() => sessionStorage.setItem('v_counted', 'true'))
        .catch(err => console.error("Firebase Error:", err));
    }

    onValue(visitorRef, (snapshot) => {
        const count = snapshot.val() || 0;
        const display = document.getElementById('visitorCount');
        if (display) display.innerText = count.toLocaleString();
    });
}

// รันตัวนับทันที
setupVisitorCounter();

// ==========================================
// 2. ส่วนแก้ปัญหาปุ่มกดไม่ได้ (ทำให้เรียกผ่าน HTML ได้)
// ==========================================
// ก๊อปชื่อฟังก์ชันที่คุณมีในไฟล์มาผูกกับ window ตรงนี้
// (ตัวอย่างเบื้องต้นที่เห็นจากโค้ดที่คุณส่งมาก่อนหน้า)
if (typeof toggleLanguageMenu === 'function') window.toggleLanguageMenu = toggleLanguageMenu;
if (typeof changeLanguage === 'function') window.changeLanguage = changeLanguage;
if (typeof toggleMobileMenu === 'function') window.toggleMobileMenu = toggleMobileMenu;

// ถ้ามีฟังก์ชันอื่นๆ ที่กดจากปุ่มแล้วไม่ได้ ให้เพิ่มแบบบรรทัดด้านบนครับ


