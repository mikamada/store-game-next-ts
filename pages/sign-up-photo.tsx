import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { getGameCategory } from "../services/player";
import { setSignUp } from "../services/auth";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { CategoryTypes } from "../services/data-types";

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("/assets/icon/upload.svg");
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
  });

  const router = useRouter();

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory();
    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, [])

  useEffect(() => {
    const getStorage = localStorage.getItem("user-form");
    setLocalForm(JSON.parse(getStorage!));
  }, [])

  const onSubmit = async () => {
    console.log("favorite", favorite);
    console.log("image", image);
    const formStorage = localStorage.getItem("user-form")
    const dataUser = JSON.parse(formStorage!);
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", dataUser.name);
    formData.append("email", dataUser.email);
    formData.append("password", dataUser.password);
    formData.append("role", "user");
    formData.append("status", "Y");
    formData.append("favorite", favorite);
    formData.append("phoneNumber", '08437583275')
    formData.append("username", dataUser.name)

    const result = await setSignUp(formData);

    if (result?.error) {
      toast.error(result.message);
    } else {
      toast.success("Register Success");
      router.push("/sign-up-success");
      localStorage.removeItem("user-form");
    }
  }

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    <Image
                      src={imagePreview}
                      width={120}
                      height={120}
                      alt="upload icon"
                      className="img-upload"
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      console.log(event.target.files);
                      const img = event.target.files?.[0];
                      setImagePreview(URL.createObjectURL(img!));
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localForm.name}</h2>
              <p className="text-lg text-center color-palette-1 m-0">{localForm.email}</p>
              <div className="pt-50 pb-50">
                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">Favorite
                  Game</label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(event) => setFavorite(event.target.value)}
                >
                  {categories.map((category: CategoryTypes) => {
                    return (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                type="button"
                onClick={onSubmit}
              >
                Create My Account
              </button>
              <a className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15" href="#"
                role="button">Terms &
                Conditions</a>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
