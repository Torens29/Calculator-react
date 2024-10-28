import { Input } from '../Input/Input';

import { Buttons } from './Buttons/Buttons';

import { useCalc, useKeyPressDetector } from './hooks';
import { CalculatorContext } from './context';

import styles from './Calculator.module.css';

export const Calculator = () => {
    const calcProps = useCalc();
    const { value, progress, history, onInput, onCalc } = calcProps;

    useKeyPressDetector({ onCalc });

    return (
        <CalculatorContext.Provider value={calcProps}>
            <div className={styles.calculator}>
                {/* <KeyPressDetector inputState={[value, setValue]} forFuncButton={{ useResult, useFunc }} /> */}
                <div className={styles.progress}>{progress}</div>
                <Input value={value} onChange={onInput} />
                <Buttons />
                <div className={styles.history}>{history}</div>
            </div>
        </CalculatorContext.Provider>
    );
};
