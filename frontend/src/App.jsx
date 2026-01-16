
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TemplateProvider } from './context/TemplateContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import GitHubCallback from './components/auth/GitHubCallback.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ToolsPage from './pages/ToolsPage.jsx';
import ComponentsPage from './pages/ComponentsPage.jsx';
import ProductivityPage from './pages/ProductivityPage.jsx';
import ShowcasePage from './pages/ShowcasePage.jsx';
import TemplateGallery from './components/templates/TemplateGallery.jsx';
import EditorLayout from './components/editor/EditorLayout.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TemplateProvider>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Template Gallery */}
            <Route
              path="/templates"
              element={
                <>
                  <Header />
                  <TemplateGallery />
                  <Footer />
                </>
              }
            />

            {/* Tools Page */}
            <Route
              path="/tools"
              element={
                <>
                  <Header />
                  <ToolsPage />
                  <Footer />
                </>
              }
            />

            {/* Components Page */}
            <Route
              path="/components"
              element={
                <>
                  <Header />
                  <ComponentsPage />
                  <Footer />
                </>
              }
            />

            {/* Productivity Page */}
            <Route
              path="/productivity"
              element={
                <>
                  <Header />
                  <ProductivityPage />
                  <Footer />
                </>
              }
            />

            {/* Showcase Page */}
            <Route
              path="/showcase"
              element={
                <>
                  <Header />
                  <ShowcasePage />
                  <Footer />
                </>
              }
            />

            {/* Editor */}
            <Route path="/editor/:templateId" element={<EditorLayout />} />

            {/* GitHub OAuth Callback */}
            <Route path="/auth/callback" element={<GitHubCallback />} />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-4">Page not found</p>
                    <a
                      href="/"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </TemplateProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
