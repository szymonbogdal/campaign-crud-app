import { useState } from "react";
import Header from "./components/Header/Header";
import { Plus } from "lucide-react";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header accountBalance={100} />
            <main className="main-content">
                <div className="container">
                    <div className="content-header">
                        <h2>Moje Kampanie</h2>
                        <button className="btn btn-primary">
                            <Plus size={20} />
                            Dodaj kampanię
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
