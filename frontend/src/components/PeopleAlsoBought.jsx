import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await axiosInstance.get("/products/recommendations");
      try {
        setRecommendations(response.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
