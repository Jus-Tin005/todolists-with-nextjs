// smooth SSR-to-client transitions (prevents flickering)

export default function Loading(){
    return (
        <div>
            Loading...
        </div>
    );
}

/*
In Next.js (App Router), 
adding a loading.tsx file next to your page (or inside a route segment) automatically enables route-level loading UI during Server-Side Rendering (SSR) → Client hydration and also when navigating between routes.
*/