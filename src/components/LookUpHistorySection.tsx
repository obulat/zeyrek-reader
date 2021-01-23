import React from "react";
import {LookUpHistory} from "./Reader";

type LookUpHistorySectionProps = {
    lookupHistory: LookUpHistory
}

export function LookUpHistorySection({lookupHistory}: LookUpHistorySectionProps) {
    return (
        <div className="history">
            <details>
                <summary>Words you&apos;ve looked up</summary>
                <p className="words">
                    {Object.keys(lookupHistory).map(word => (
                        <span key={word}>{word}: {lookupHistory[word]}</span>
                    ))}
                </p>
            </details>
        </div>
    )
}
