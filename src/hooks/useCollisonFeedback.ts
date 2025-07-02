import { useCallback, useRef } from 'react';

export const useCollisionFeedback = () => {
    const lastNotificationTime = useRef<number>(0);
    const NOTIFICATION_COOLDOWN = 1500; // 1.5 seconds between notifications

    const showCollisionWarning = useCallback(() => {
        const now = Date.now();
        if (now - lastNotificationTime.current > NOTIFICATION_COOLDOWN) {
            // Simple console warning - you can replace with your notification system
            console.warn('⚠️ Cannot place node here - position would overlap with existing node');
            lastNotificationTime.current = now;

            // Optional: Add visual feedback to the canvas
            // Could integrate with your existing overlay system
        }
    }, []);

    return { showCollisionWarning };
};