import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/sign-in/$")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <section id="sign-in">
            <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                fallbackRedirectUrl={"/"}
            />
        </section>
    );
}
