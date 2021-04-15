import React, {useState} from 'react';

export const List = () => {

    const [posts, setPosts] = useState<GameShortInfo[]>();
    useEffect( () => {
        api.games.fetchGames().then(setGames);
    }, [api]);
    
    return <span>TODO</span>;
}
