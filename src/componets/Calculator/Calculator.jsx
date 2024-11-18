import { Input } from '../Input/Input';

import { Buttons } from './Buttons/Buttons';

import { useCalc, useKeyPressDetector } from './hooks';
import { CalculatorContext } from './context';
import { SystemCalc } from '../SystemCalc/SystemCalc';

import styles from './Calculator.module.css';

export const Calculator = () => {
    const calcProps = useCalc();
    const { value, progress, history, onInput, onCalc } = calcProps;

    const pressedKey = useKeyPressDetector({ onCalc });

    return (
        <CalculatorContext.Provider value={{ ...calcProps, pressedKey }}>
            <div className={styles.calculator}>
                <div className={styles.progress}>{progress}</div>
                <Input value={value} onChange={onInput} />
                <Buttons />
                <SystemCalc className={styles.systemCalc} />
            </div>
            <div className={styles.history}>
                History:
                <div>{history}</div>
            </div>
        </CalculatorContext.Provider>
    );
};
