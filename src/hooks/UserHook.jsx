import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';

const useUser = () => {
    const { user } = useAuth();
    const email = user?.email; 
    const token = user?.token;

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8080/api/users/by-email/${email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": 'application/json',
                        },
                    }
                );
                setUserInfo(res.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setUserInfo(null);
            } finally {
                setLoading(false);
            }
        };

        if (email && token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [email, token]);

    return { userInfo, loading };
};

export default useUser;
