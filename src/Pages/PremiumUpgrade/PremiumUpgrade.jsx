import useAuth from "../../Hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PremiumUpgrade = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 🔐 Get user plan from DB (source of truth)
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(dbUser);

  if (!user || isLoading) return null;



  // 💳 Stripe checkout
  const handleCheckout = async () => {

  
    const res = await axiosSecure.post("/create-checkout-session", {
      price: 1500,
    });

    window.location.href = res.data.url;
    console.log(res.data.url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-black">
      <h2 className="text-3xl font-bold text-center mb-6">
        Upgrade to Premium ⭐
      </h2>

      {/* 💎 Comparison Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table table-bordered">
          <thead className="bg-base-200">
            <tr>
              <th>Features</th>
              <th className="text-center">Free</th>
              <th className="text-center">Premium ⭐</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number of Lessons</td>
              <td className="text-center">Limited</td>
              <td className="text-center font-bold">Unlimited</td>
            </tr>
            <tr>
              <td>Create Premium Lessons</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Ad-Free Experience</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Priority Listing</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Advanced Analytics</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Save Unlimited Lessons</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Early Feature Access</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Lifetime Access</td>
              <td className="text-center">❌</td>
              <td className="text-center font-bold">✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 💰 Pricing */}
      <div className="text-center">
        <p className="text-xl mb-4">
          One-time payment — <span className="font-bold">৳1500</span> (Lifetime)
        </p>

        <button
          onClick={handleCheckout}
          className="btn btn-warning btn-lg"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
