import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

import { INITIAL_CAMPAIGNS } from "./data/mockData";

function App() {
    const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCampaigns = useMemo(() => {
        if (!searchTerm.trim()) {
            return campaigns;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return campaigns.filter(
            (campaign) =>
                campaign.name.toLowerCase().includes(lowerSearchTerm) ||
                campaign.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(lowerSearchTerm)
                ) ||
                campaign.town.toLowerCase().includes(lowerSearchTerm)
        );
    }, [campaigns, searchTerm]);

    console.log(filteredCampaigns);

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
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
