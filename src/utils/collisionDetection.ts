import type { Node } from "@xyflow/react";

export const NODE_DIMENSIONS = {
    width: 288,
    height: 140,
    padding: 20,
} as const;



function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;

    return function (...args: Parameters<T>) {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(null, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(null, args);
            }, remaining);
        }
    };
}

function isRectangleOverlapping(
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
): boolean {
    return !(
        rect1.x + rect1.width <= rect2.x ||
        rect2.x + rect2.width <= rect1.x ||
        rect1.y + rect1.height <= rect2.y ||
        rect2.y + rect2.height <= rect1.y
    );
}

export function isNodeColliding(
    targetNode: Node,
    allNodes: Node[],
    newPosition: { x: number; y: number }
): boolean {
    const targetRect = {
        x: newPosition.x,
        y: newPosition.y,
        width: NODE_DIMENSIONS.width + NODE_DIMENSIONS.padding,
        height: NODE_DIMENSIONS.height + NODE_DIMENSIONS.padding,
    };

    return allNodes.some((node) => {
        if (node.id === targetNode.id) return false;

        const nodeRect = {
            x: node.position.x,
            y: node.position.y,
            width: NODE_DIMENSIONS.width + NODE_DIMENSIONS.padding,
            height: NODE_DIMENSIONS.height + NODE_DIMENSIONS.padding,
        };

        return isRectangleOverlapping(targetRect, nodeRect);
    });
}

export function findNearestValidPosition(
    targetNode: Node,
    allNodes: Node[],
    desiredPosition: { x: number; y: number },
    maxAttempts = 30
): { x: number; y: number } {
    const gridSize = 20;

    if (!isNodeColliding(targetNode, allNodes, desiredPosition)) {
        return desiredPosition;
    }

    let bestPosition = desiredPosition;
    let minDistance = Infinity;

    const maxRadius = maxAttempts * gridSize * 0.5;

    for (let radius = gridSize; radius < maxRadius; radius += gridSize) {
        const positions = getPositionsAtRadius(desiredPosition, radius, gridSize);

        for (const position of positions) {
            if (!isNodeColliding(targetNode, allNodes, position)) {
                const distance = Math.sqrt(
                    Math.pow(position.x - desiredPosition.x, 2) +
                    Math.pow(position.y - desiredPosition.y, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    bestPosition = position;
                }

                if (distance < gridSize * 2) {
                    return position;
                }
            }
        }

        if (minDistance < radius * 1.5) {
            break;
        }
    }

    return bestPosition;
}

function getPositionsAtRadius(
    center: { x: number; y: number },
    radius: number,
    gridSize: number
): { x: number; y: number }[] {
    if (radius === 0) {
        return [center];
    }

    const positions: { x: number; y: number }[] = [];
    const steps = Math.min(16, Math.max(8, Math.ceil((2 * Math.PI * radius) / (gridSize * 2))));

    for (let i = 0; i < steps; i++) {
        const angle = (2 * Math.PI * i) / steps;
        const x = Math.round((center.x + radius * Math.cos(angle)) / gridSize) * gridSize;
        const y = Math.round((center.y + radius * Math.sin(angle)) / gridSize) * gridSize;
        positions.push({ x, y });
    }

    return positions;
}

export const throttledCollisionCheck = throttle(
    (
        targetNode: Node,
        allNodes: Node[],
        position: { x: number; y: number },
        callback: (isColliding: boolean) => void
    ) => {
        const isColliding = isNodeColliding(targetNode, allNodes, position);
        callback(isColliding);
    },
    16
);

export const performanceMonitor = {
    enabled: process.env.NODE_ENV === 'development',

    measure<T>(name: string, fn: () => T): T {
        if (!this.enabled) return fn();

        const start = performance.now();
        const result = fn();
        const end = performance.now();

        console.log("end - start", end - start);

        if (end - start > 1) {
            console.log(`🐌 Performance: ${name} took ${(end - start).toFixed(2)}ms`);
        }

        return result;
    }
};