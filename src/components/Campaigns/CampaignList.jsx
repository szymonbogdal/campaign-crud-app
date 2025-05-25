import { Target } from "lucide-react";
import CampaignCard from "./CampaignCard";
import Pagination from "./Pagination";
import "./Campaigns.css";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 6;

const CampaignList = ({ campaigns, isSearch, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedCampaigns = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return campaigns.slice(startIndex, endIndex);
    }, [campaigns, currentPage]);

    const totalPages = Math.ceil(campaigns.length / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (campaigns.length === 0) {
        return (
            <div className="empty-state">
                <Target size={48} />
                <h3>No campaigns</h3>
                <p>
                    {isSearch
                        ? "No campaigns matching your search."
                        : "Add your first campaign to get started."}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="campaigns-grid">
                {paginatedCampaigns.map((campaign) => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onEdit={() => onEdit(campaign)}
                        onDelete={() => onDelete(campaign.id)}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default CampaignList;
