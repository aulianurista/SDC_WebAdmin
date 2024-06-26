import React, { useState, useEffect } from "react";
import { Box, Progress, Select, Input, Flex, Text } from "@chakra-ui/react";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import {
  getAllTransaksi,
  getUserByRole,
  getTransaksiByIdUser,
  getTransaksiByDate,
} from "./fragments/ApiHandler";
import { useNavigate } from "react-router-dom";
import { getLocalStorage , clearLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";

export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // state untuk data transaksi
  const [dataUser, setDataUser] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // fungsi untuk mengambil data transaksi
  const getData = async () => {
    const res = await getAllTransaksi();
    setData(res.data);
  };

  // fungsi untuk mengambil data user yang memiliki role kasir
  const getDataUser = async () => {
    const res = await getUserByRole("kasir");
    setDataUser(res.data);
  };

  // fungsi untuk mengambil data transaksi berdasarkan id user
  const getDataByIdUser = async (id) => {
    const res = await getTransaksiByIdUser(id);
    setData(res.data);
  };

  // fungsi untuk mengambil data transaksi berdasarkan date
  const getDataByDate = async (date) => {
    const res = await getTransaksiByDate(date);
    setData(res.data);
  };

  // ambil data pengguna ketika komponen pertama kali di render
  useEffect(() => {
    setLoading(true);
    getData();
    getDataUser();
    setLoading(false);
    
    // ambil data user dari local storage
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    setUser(user);
    if(user){
      if(user.role !== "manajer"){
        navigate("/login");
        clearLocalStorage();
      }
    }
  }, []);

  return (
    <Container>
      <Heading text="Kelola Transaksi" /> {/* memanggil komponen heading */}
      <Flex
        gap={{ base: 2, md: 5 }}
        w={{ base: "full", md: "50%" }}
        flexDir={{ base: "column", md: "row" }}
        mt={{ base: 2, md: 5 }}
      >
        <Flex direction="column" w={"full"}>
          <Text fontSize={"sm"} fontFamily={"Poppins"}>
            Filter Kasir
          </Text>
          <Select
            placeholder="Pilih Kasir"
            size="sm"
            borderRadius="lg"
            focusBorderColor="messenger.500"
            onChange={(e) => {
              if (e.target.value === "") {
                getData();
                return;
              } else {
                getDataByIdUser(e.target.value);
              }
            }}
          >
            {/* menampilkan data user yang memiliki role manajer */}
            {dataUser?.map((item, index) => {
              return (
                <option key={index} value={item.id_user}>
                  {item.nama_user}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex direction="column" w={"full"}>
          <Text fontSize={"sm"} fontFamily={"Poppins"}>
            Filter Tanggal
          </Text>
          <Input
            placeholder="Cari Transaksi"
            borderRadius="lg"
            focusBorderColor="messenger.500"
            size="sm"
            type={"date"}
            onChange={(e) => {
              if (e.target.value === "") {
                getData();
                return;
              } else {
                getDataByDate(e.target.value);
              }
            }}
          />
        </Flex>
      </Flex>
      <Box my={10} maxW={"100%"}>
        {/*  jika loading true, maka tampilkan progress bar, jika loading false maka tampilkan table */}
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={"100%"}>
            <Table
              columns={columns}
              data={data?.map((item, index) => {
                return {
                  ...item,
                  reload: getData,
                  key: index,
                };
              })}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 3,
                showSizeChanger: true,
                pageSizeOptions: ["3", "5", "10"],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} dari ${total} items`,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}