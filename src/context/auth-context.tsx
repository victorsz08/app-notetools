import { api } from "@/lib/axios/api";
import type { User } from "@/types";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

export interface Credentials {
    username: string;
    password: string;
}

export interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: Credentials) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {},
    logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (credentials: Credentials) => {
        try {
            await api.post("auth/login", credentials);
            const session = await api.get<User>("auth/me");

            setUser(session.data);
            setIsAuthenticated(true);
            return;
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await api.post("auth/logout");

            setUser(null);
            setIsAuthenticated(false);

            return;
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const session = async () => {
            try {
                const response = await api.get<User>("auth/me");
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        session();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Context provider not instanced");
    }

    return context;
}
