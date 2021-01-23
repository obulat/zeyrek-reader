import React from "react";
import {WordDefinitions, WordMeanings} from "./Reader";

export function SelectedWordDefinitions({definitions}: {definitions: WordDefinitions}) {
    return (
        <div className='definitions'>
            {definitions.meanings.map((meaning: WordMeanings, index: number) => (
                <React.Fragment key={index}>
                    {Object.keys(meaning).map((term: string, idx: number) => (
                        <React.Fragment key={idx}>
                            <p className="definition-term">{term}</p>
                            <ol>
                                {meaning[term].map(line => (
                                    <li key={line.id}>
                                        <span className="pos">{line.pos}</span>
                                        <span className="definition-text">{line.meaning}</span>
                                    </li>
                                ))}
                            </ol>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}
