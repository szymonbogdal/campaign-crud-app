import { Target } from "lucide-react";
import CampaignCard from "./CampaignCard";
import "./Campaigns.css";

const CampaignList = ({ campaigns, isSearch, onEdit, onDelete }) => {
    return (
        <div className="campaigns-grid">
            {campaigns.length === 0 ? (
                <div className="empty-state">
                    <Target size={48} />
                    <h3>No campaigns</h3>
                    <p>
                        {isSearch
                            ? "No campaigns matching your search."
                            : "Add your first campaign to get started."}
                    </p>
                </div>
            ) : (
                campaigns.map((campaign) => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onEdit={() => onEdit(campaign)}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
};

export default CampaignList;
