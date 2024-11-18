import { useCallback, useContext } from 'react';
import cn from 'classnames';
import styles from './SystemCalc.module.css';

import { toHex, toDec, toOct, toBin } from '../../lib/maths';
import { CalculatorContext } from '../Calculator/context';
// import { value } from '../Calculator/hooks';

export const SystemCalc = ({ className, ...props }) => {
    const { value } = useContext(CalculatorContext);

    const convertNumb = useCallback((funcConvert) => funcConvert(+value), [value]);
    const resultConvert = [toHex, toDec, toOct, toBin].map((funcConvert, id) =>
        convertNumbLine(funcConvert, convertNumb, id)
    );

    return (
        <div {...props} className={cn(className, styles.SystemCalc)}>
            {resultConvert}
        </div>
    );
};

const convertNumbLine = (funcConvert, convertNumb, id) => {
    return (
        <div className={cn(styles.convertNumbLine)} key={id}>
            <div className={cn(styles.nameFuncConvert)}>{funcConvert.name.slice(2) + ":"}</div>
            <div>{convertNumb(funcConvert)}</div>
            
        </div>
    );
};
