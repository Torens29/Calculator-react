import { useState, useEffect, useCallback } from 'react';

import { div, mult, diff, sum } from '../../lib/maths';

export const useCalc = () => {
    const [value, setValue] = useState('0');
    const [result, setResult] = useState(0);
    const [funcCalc, setFuncCalc] = useState();
    const [pressResult, setPressResult] = useState(false);

    const [progress, setProgress] = useState('');
    const [history, setHistory] = useState([]);

    const changeInput = useCallback((value) => {
        if (value === '') value = 0;
        setValue(+value);
    }, []);

    const func = useCallback(
        (buttonValue) => {
            const selectFunc = (func) => {
                setResult(value);
                setValue(0);
                setFuncCalc(func);
            };

            switch (buttonValue) {
                case '=':
                    setPressResult(true);
                    setProgress(progress + value + ' = ');

                    setHistory([
                        ...history,
                        <div className="calculator__historyLine" key={value}>
                            {progress} {value}
                        </div>,
                    ]);
                    setValue(funcCalc(result, value));
                    console.log('value', value, result, progress);

                    setFuncCalc();
                    break;
                case '<=':
                    setValue(value.toString().slice(0, -1));
                    break;
                case 'res':
                    setValue(0);
                    break;
                case '+':
                    setProgress(value + ' + ');
                    selectFunc(sum);
                    break;
                case '-':
                    setProgress(value + ' - ');
                    selectFunc(diff);
                    break;
                case '/':
                    setProgress(value + ' / ');
                    selectFunc(div);
                    break;
                case '*':
                    setProgress(value + ' * ');
                    selectFunc(mult);
                    break;
                case '.':
                    if (value[value.length - 1] !== '.') setValue(value.toString() + '.');
                    break;
                default:
                    if (typeof +buttonValue === 'number') {
                        if (pressResult) {
                            console.log('pressResult', pressResult);
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
        [pressResult, value, progress, result, history, funcCalc]
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

    const handleKeyPress = useCallback((event) => {
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (numbers.includes(event.key)) {
            onCalc(event.key);
        }

        setPressedKey(event.key);
    });

    console.log(typeof pressedKey);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
};
