import React, { useState, useContext } from "react";

import BaseTemplate from "../templates/BaseTemplate";
import FoodModal from "../templates/FoodModal/FoodModal";
import FoodDetail from "../templates/FoodDetail";
import { ModalTypeEnum, PageTypeEnum } from "../../tools/Enums";
import { UserContext } from "../../Control";
import { useParams } from "react-router";
import firebase from "../../Firebase";
import Loading from "../atoms/Loading/Loading";
import { useGetData } from "../../hooks/HookGetDetail";
import { useGetIngredients } from "../../hooks/HookGetIngredients";

const FoodDetailPage = () => {
  const { user, userId } = useContext(UserContext);

  const { slug } = useParams();

  const [modalData, setModalData] = useState({
    type: ModalTypeEnum.ADD_FOOD,
    visibility: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const recipeData = useGetData(slug);

  useGetIngredients();

  const openModal = (type, message, payload) => {
    setModalData({
      type: type,
      visibility: true,
      message: message,
      payload: payload,
    });
  };
  const onModalClose = (type) => setModalData({ visibility: false });

  const onFavouriteClicked = () => {
    user.name !== ""
      ? addFoodToFavourite()
      : openModal(
          ModalTypeEnum.NOT_LOGGED,
          "Please, log in for saving your favourite foods.",
          recipeData
        );
  };

  const addFoodToFavourite = async () => {
    setLoading(true);
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          favourite: firebase.firestore.FieldValue.arrayUnion(recipeData._id),
        });
      openModal(ModalTypeEnum.FAV_ADDED, "Food was added to favourites!");
      setLoading(false);
    } catch (error) {
      setModalData({ message: error.message });
      setLoading(false);
    }
  };

  const onEditClicked = () => {
    openModal(ModalTypeEnum.EDIT_FOOD, "", recipeData);
  };

  const onEditSubmit = (title, preparationTime, directions, ingredients) => {
    //odeslani na api
    console.log(`nejaky title: ${title}`);
  };

  return (
    <BaseTemplate title={recipeData.title} pageType={PageTypeEnum.DETAIL}>
      <FoodModal
        data={modalData}
        onClose={onModalClose}
        onEditSave={onEditSubmit}
      />
      {!loading ? (
        <>
          <FoodDetail
            key={recipeData.slug}
            title={recipeData.title}
            preparationTime={recipeData.preparationTime}
            ingredients={recipeData.ingredients}
            slug={recipeData.slug}
            directions={recipeData.directions}
            lastModifiedDate={recipeData.lastModifiedDate}
            onEditClicked={onEditClicked}
            onFavouriteClicked={onFavouriteClicked}
          />
        </>
      ) : (
        <Loading />
      )}
    </BaseTemplate>
  );
};

export default FoodDetailPage;
