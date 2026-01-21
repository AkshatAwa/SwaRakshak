import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout";
import LandingPage from "@/pages/landing";
import RoleSelectionPage from "@/pages/role-selection";
import ChatPage from "@/pages/chat";
import AboutPage from "@/pages/about";
import ApiPage from "@/pages/api-docs";
import NotFound from "@/pages/not-found";
import LegalDraftPage from "./pages/LegalDraftPage";
import DraftModeSelect from "./pages/DraftModeSelect";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/roles" component={RoleSelectionPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/draft/workspace" component={LegalDraftPage} />
      <Route path="/draft/select" component={DraftModeSelect} />
      <Route path="/about" component={AboutPage} />
      <Route path="/api" component={ApiPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
