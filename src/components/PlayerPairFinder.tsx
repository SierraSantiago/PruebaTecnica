// PlayerPairFinder.tsx
import React, { useEffect, useState } from "react";
import { Player } from "../models/Sentence";
import { ShowPlayer } from "./ShowPlayer";
import "../css/App.css";

const PlayerPairFinder: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerPairs, setPlayerPairs] = useState<[Player, Player][]>([]);
    const [targetSum, setTargetSum] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://mach-eight.uc.r.appspot.com/");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPlayers(data.values);
            } catch (error) {
                console.error("Error al obtener los datos de la API:", error);
            }
        };

        fetchData();

    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetSum(Number(event.target.value));
    };

    const handleButtonClick = () => {
        const result = findPlayerPairsWithSum(players, targetSum);
        setPlayerPairs(result);
    };

    const findPlayerPairsWithSum = (players: Player[], targetSum: number): [Player, Player][] => {
        const pairs: [Player, Player][] = [];
        const heights = players.map((player) => Number(player.h_in));

        for (let i = 0; i < players.length; i++) {
            for (let j = i + 1; j < players.length; j++) {
                if (heights[i] + heights[j] === targetSum) {
                    pairs.push([players[i], players[j]]);
                }
            }
        }

        return pairs;
    };

    return (
        <div className="Pair">
            <h1>Lista de Parejas de Jugadores</h1>
            <input
                type="number"
                value={targetSum}
                onChange={handleInputChange}
                placeholder="Ingrese una suma de altura"
            />

            <button onClick={handleButtonClick}>Buscar</button>
            <p>Número de parejas encontradas: {playerPairs.length}</p>

            {playerPairs.length > 0 ? (
                playerPairs.map((pair, index) => (
                    <div key={index}>
                        <ShowPlayer player={pair[0]} />
                        <ShowPlayer player={pair[1]} />
                        <div className="pair-divider"></div> {/* Divider entre parejas */}
                    </div>
                ))
            ) : (
                <p>No hay parejas de jugadores con esa suma de altura.</p>
            )}
        </div>
    );
};

export default PlayerPairFinder;
