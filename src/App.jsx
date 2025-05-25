import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import CampaignList from "./components/Campaigns/CampaignList";
import CampaignForm from "./components/CampaignForm/CampaignForm";
import "./App.css";

import { INITIAL_CAMPAIGNS } from "./data/mockData";

function App() {
    const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
    const [searchTerm, setSearchTerm] = useState("");
    const [accountBalance, setAccountBalance] = useState(2500.0);
    const [showForm, setShowForm] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);

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

    const handleAddCampaign = (campaignData) => {
        const newId =
            campaigns.length > 0
                ? Math.max(...campaigns.map((campaign) => campaign.id)) + 1
                : 1;
        const newCampaign = {
            id: newId,
            ...campaignData,
        };
        setCampaigns([...campaigns, newCampaign]);
        setAccountBalance((prev) => prev - campaignData.campaignFund);
        setShowForm(false);
    };

    const handleEditCampaign = (campaignData) => {
        const originalCampaign = campaigns.find(
            (c) => c.id === editingCampaign.id
        );
        const originalFund = originalCampaign.campaignFund;
        const newFund = campaignData.campaignFund;
        const fundDifference = newFund - originalFund;

        setCampaigns(
            campaigns.map((campaign) =>
                campaign.id === editingCampaign.id
                    ? { ...campaign, ...campaignData }
                    : campaign
            )
        );

        setAccountBalance((prev) => prev - fundDifference);
        setEditingCampaign(null);
    };

    return (
        <div className="app">
            <Header accountBalance={accountBalance} />
            <main className="main-content">
                <div className="container">
                    <div className="content-header">
                        <h2>Moje Kampanie</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus size={20} />
                            Dodaj kampanię
                        </button>
                    </div>
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                    <CampaignList
                        campaigns={filteredCampaigns}
                        isSearch={searchTerm.trim()}
                        onEdit={setEditingCampaign}
                        onDelete={(id) => console.log(`Delete campaign ${id}`)}
                    />
                </div>
            </main>
            {showForm && (
                <CampaignForm
                    onSubmit={handleAddCampaign}
                    onCancel={() => setShowForm(false)}
                    accountBalance={accountBalance}
                />
            )}

            {editingCampaign && (
                <CampaignForm
                    campaign={editingCampaign}
                    onSubmit={handleEditCampaign}
                    onCancel={() => setEditingCampaign(null)}
                    isEdit={true}
                    accountBalance={accountBalance}
                />
            )}
        </div>
    );
}

export default App;
