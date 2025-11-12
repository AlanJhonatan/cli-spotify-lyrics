import { useState } from "react";

interface Tokens {
    access: string;
    refresh: string;
}

export function useAccessToken() {
    const [acessToken, setAccessToken] = useState<string>('')
    const [refreshToken, setRefreshToken] = useState<string>('')


    function setTokens ({ access, refresh }: Tokens) {
        setAccessToken(access);
        setRefreshToken(refresh);
    }

    function getTokens() {
        return {
            acessToken,
            refreshToken
        }
    }

    return {
        setTokens,
        getTokens,
    }
}