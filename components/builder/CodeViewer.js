'use client';
import React from 'react';
import styles from './CodeViewer.module.css';

export const CodeViewer = ({ schema }) => {
    return (
        <div className={styles.codeContainer}>
            <pre>
                {JSON.stringify(schema, null, 2)}
            </pre>
        </div>
    );
};
