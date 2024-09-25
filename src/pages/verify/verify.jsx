import { useSearchParams, useNavigate } from "react-router-dom";
import "./verify.css";
import axios from "axios";
import { URL_API } from "../../constant/Contant";
import { useEffect } from "react";

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get(`success`);
  const orderId = searchParams.get(`orderId`);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const { data } = await axios.post(`${URL_API}/order/verify`, {
      success,
      orderId,
    });

    if (data.success) {
      navigate(`/myorders`);
    } else {
      navigate(`/`);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
