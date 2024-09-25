import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Context
import { StoreCTX } from "../../context/StoreProvider";
// Lib
import { formatCurrency } from "../../lib/formating-currency";
import { URL_API } from "../../constant/Contant";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "tomato",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableCart() {
  const { food_list, cartItems, removeFromCart } = StoreCTX();
  return (
    <TableContainer
      component={Paper}
      className=" max-h-[25rem] lg:max-h-[30rem]"
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ background: "orange" }}>
          <TableRow>
            <StyledTableCell>Items</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {food_list &&
            food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      <img
                        className="w-12"
                        src={`${URL_API}/images/${item.image}`}
                        alt={item.name}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      component="th"
                      scope="row"
                    >
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      align="right"
                    >
                      {formatCurrency(item.price)}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      align="right"
                    >
                      {cartItems[item._id]}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                      align="right"
                    >
                      {formatCurrency(item.price * cartItems[item._id])}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton onClick={() => removeFromCart(item._id)}>
                        <CloseIcon fontSize="medium" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
