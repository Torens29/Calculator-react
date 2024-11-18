import cn from 'classnames';
import { useCallback, useContext } from 'react';

import { group } from '../../../lib/array';

import { Button } from '../../Button/Button';

import { CalculatorContext } from '../context';

import styles from './Buttons.module.css';

const CalcButton = ({ symbol }) => {
    const { onCalc, pressedKey } = useContext(CalculatorContext);
    
    return (
        <Button
            active={String(pressedKey) === String(symbol)}
            onClick={useCallback(() => {
                onCalc(String(pressedKey));
            }, [onCalc, pressedKey,])}
        >
            {symbol}
        </Button>
    );
};

const ButtonsGroup = ({ items, length, className }) =>
    group(
        items.map((symbol) => <CalcButton key={symbol} symbol={symbol} />),
        length
    ).map((elems, idx) => (
        <div className={cn(className, styles.buttonGroup)} key={idx}>
            {elems}
        </div>
    ));

const ops = ['+', '-', '*', '/', '.'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Buttons = () => {
    return (
        <div className={styles.buttons}>
            <div className={cn(styles.buttonGroup, styles.buttonGroupNums)}>
                <ButtonsGroup items={nums} length={3} />
                <CalcButton symbol="0" />
            </div>
            <div className={cn(styles.buttonGroup, styles.buttonFunc)}>
                <div className={styles.buttonGroup}>
                    <CalcButton symbol="res" />
                    <CalcButton symbol="<=" />
                    <CalcButton symbol="=" />
                </div>
                <div className={styles.buttonGroupCol}>
                    <ButtonsGroup items={ops} length={2} />
                </div>
            </div>
        </div>
    );
};
