import { useState, useEffect, useCallback, useMemo } from 'react';

import { div, mult, diff, sum } from '../../lib/maths';

export const useCalc = () => {
    const [value, setValue] = useState('0');
    const [result, setResult] = useState(0);
    const [funcCalc, setFuncCalc] = useState();
    const [pressResult, setPressResult] = useState(false);

    const [progress, setProgress] = useState('');
    const [history, setHistory] = useState([]);
    const ops = useMemo(() => ['+', '-', '*', '/', '.'], []);

    const changeInput = useCallback((value) => {
        if (value === '') value = 0;
        setValue(+value);
    }, []);

    const addOper = useCallback(
        (symbol) => {
            if (ops.includes(progress.at(-2))) {
                setProgress(progress.slice(0, -2) + symbol);
            } else {
                setResult(value);
                setProgress(value + symbol);
            }
        },
        [value, progress, ops]
    );

    const func = useCallback(
        (buttonValue) => {
            const selectFunc = (func) => {
                setValue(0);
                setFuncCalc(func);
            };

            console.log('buttonValue', buttonValue);

            switch (buttonValue) {
                case 'Enter':
                case '=':
                    setPressResult(true);
                    setProgress(progress + value + ' = ');

                    setValue(funcCalc(result, value));
                    setHistory([
                        ...history,
                        <div className="calculator__historyLine" key={history.length}>
                            {progress} {value} = {funcCalc(result, value)}
                        </div>,
                    ]);

                    setFuncCalc();
                    break;
                case 'Backspace':
                case '<=':
                    setValue(value.toString().slice(0, -1));
                    break;
                case 'res':
                    setValue(0);
                    break;
                case '+':
                    addOper(' + ');
                    selectFunc(sum);
                    break;
                case '-':
                    addOper(' - ');
                    selectFunc(diff);
                    break;
                case '/':
                    addOper(' / ');
                    selectFunc(div);
                    break;
                case '*':
                    addOper(' * ');
                    selectFunc(mult);
                    break;
                case '.':
                    if (value[value.length - 1] !== '.') setValue(value.toString() + '.');
                    break;
                default:
                    if (typeof +buttonValue === 'number') {
                        if (pressResult) {
                            setValue('0');
                            setPressResult(false);
                        }

                        setValue((value) => {
                            if (+value === 0) return buttonValue;
                            return `${value}${buttonValue}`;
                        });
                    } else {
                        console.log('Шо за кнопка, блять?');
                    }

                    break;
            }
        },
        [pressResult, value, progress, result, history, funcCalc, addOper]
    );

    return {
        pressResult,
        value,
        progress,
        result,
        history,
        onInput: changeInput,
        onCalc: func,
    };
};

export const useKeyPressDetector = ({ onCalc }) => {
    const [pressedKey, setPressedKey] = useState(null);

    const handleKeyPress = useCallback(
        (event) => {
            console.log(event.key);

            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const funcButton = ['+', '-', '*', '/', '.', '=', 'Enter', 'Backspace'];

            if (numbers.includes(event.key) || funcButton.includes(event.key)) {
                onCalc(event.key);
            }

            setPressedKey(event.key);
        },
        [onCalc]
    );

    const handleKeyUp = useCallback(() => {
        setPressedKey(null);
    }, []);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyUp]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return pressedKey;
};
