import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddActivity.css";

function EditActivity() {
  const [img_kegiatan, setImg] = useState("");
  const [judul_kegiatan, setJudul] = useState("");
  const [tgl_kegiatan, setTgl] = useState("");
  const [lokasi_kegiatan, setLokasi] = useState("");
  const [deskripsi, setDesc] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getActivityById();
  }, []);

  const getActivityById = async () => {
    const response = await axios.put(`https://febe12be-production.up.railway.app/Kegiatan/update/${id}`);
    setImg(response.data.data.img_kegiatan || []);
    setJudul(response.data.data.judul_kegiatan || []);
    setTgl(response.data.data.tgl_kegiatan || []);
    setLokasi(response.data.data.lokasi_kegiatan || []);
    setDesc(response.data.data.deskripsi || []);
  };

  const updateActivity = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://febe12be-production.up.railway.app/Kegiatan/update/${id}`, {
        img_kegiatan: img_kegiatan,
        judul_kegiatan: judul_kegiatan,
        tgl_kegiatan: tgl_kegiatan,
        lokasi_kegiatan: lokasi_kegiatan,
        deskripsi: deskripsi,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bgFormAdd">
      <div className="containerCard d-flex justify-content-center">
        <div className="card" style={{ width: "40rem", borderRadius: "20px", backgroundColor: "#ffff" }}>
          <div className="titleAct d-flex justify-content-center">
            <div>
              <img src="https://res.cloudinary.com/dxi5woyp1/image/upload/v1669737831/MyNature/Bookmarks_un3edl.svg" alt="" />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <h3>Tambah Activity</h3>
          </div>

          <div className="formAdd d-flex justify-content-center">
            <form style={{ width: "30rem" }} onSubmit={updateActivity}>
              <div className="form-group">
                <label>Gambar Article</label>
                <input type="url" className="input form-control" value={img_kegiatan} onChange={(e) => setImg(e.target.value)} placeholder="Masukkan Link Gambar" />
              </div>
              <div className="form-group">
                <label>Judul Article</label>
                <input type="text" className="input form-control" value={judul_kegiatan} onChange={(e) => setJudul(e.target.value)} placeholder="Masukkan Judul Kegiatan" />
              </div>
              <div className="form-group">
                <label>Jadwal Kegiatan</label>
                <input type="date" className="input form-control" value={tgl_kegiatan} onChange={(e) => setTgl(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Lokasi Kegiatan</label>
                <input type="text" className="input form-control" value={lokasi_kegiatan} onChange={(e) => setLokasi(e.target.value)} placeholder="Masukkan Kota Pelaksaaan" />
              </div>
              <div className="form-group">
                <label>Deksripsi Kegiatan</label>
                <textarea type="text" className="input form-control" value={deskripsi} onChange={(e) => setDesc(e.target.value)} placeholder="Masukkan Deskripsi Kegiatan" />
              </div>
              <div className="btnAddAct form-group">
                <button type="submit" className="btn btn-addAct">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditActivity;
