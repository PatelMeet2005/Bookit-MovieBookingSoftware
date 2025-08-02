import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useFormik } from 'formik';
import Utils from '../../../common/UtilsPart/Utils';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AdminMovie = () => {
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarsuccessMessage, setSnackbarSuccessMessage] = useState('');
  const [snackbarerrorMessage, setSnackbarErrorMessage] = useState('');


  const handleSuccessAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarSuccessOpen(false);
  }

  const handleErrorAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarErrorOpen(false);
  }

  const formik = useFormik({
    initialValues: {
      movieName: '',
      releaseDate: '',
      director: '',
      actors: '',
      actress: '',
      trailerlink: '',
      photo: null,
      description: '',
      banner: null,
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form Submitted!!");
      await saveApplication(values);
      setSubmitting(false);
    },
  });

  const saveApplication = async (values) => {
    try {
      const formData = new FormData();
      formData.append('movieName', values.movieName);
      formData.append('releaseDate', values.releaseDate);
      formData.append('director', values.director);
      formData.append('actors', values.actors);
      formData.append('actress', values.actress);
      formData.append('trailerlink', values.trailerlink);
      formData.append('photo', values.photo);
      formData.append('description', values.description);
      formData.append('banner', values.banner);

      const response = await axios.post(`${Utils.BaseURL5}/addmoviedata`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("MovieData:", response.data);

      if(response.status === 200){
        setSnackbarSuccessMessage(response.data.message);
        setSnackbarSuccessOpen(true);
        formik.resetForm();

      }else{
        setSnackbarErrorMessage(response.data.message);
        setSnackbarErrorOpen(true);

      }
    } catch (error) {
      console.log("Error while Saving Data!", error);
      setSnackbarErrorMessage(error.response.data.message);
        setSnackbarErrorOpen(true);
    }
  };

  return (
    <AdminMainContent>
      <AdminHeading>Add Movies</AdminHeading>
      <AdminForm onSubmit={formik.handleSubmit}>
        <MainContent>
          <MoviesPart>
            <Label>Movies Name</Label>
            <Input
             type="text"
  id="movieName"
  name="movieName"
  value={formik.values.movieName}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Release Date</Label>
            <Input type="date"
              id="releaseDate"
              name="releaseDate"
              value={formik.values.releaseDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Director</Label>
            <Input type="text"
              id="director"
              name="director"
              value={formik.values.director}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Actors</Label>
            <Input type="text"
              id="actors"
              name="actors"
              value={formik.values.actors}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Actress</Label>
            <Input type="text"
              id="actress"
              name="actress"
              value={formik.values.actress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Trailer Link</Label>
            <Input type="text"
              id="trailerlink"
              name="trailerlink"
              value={formik.values.trailerlink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Photo</Label>
            <Input type="file"
              id="photo"
              name="photo"
               accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("photo", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Description</Label>
            <TextArea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <MoviesPart>
            <Label>Banner</Label>
            <Input type="file"
              id="banner"
              name="banner"
               accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("banner", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
          </MoviesPart>

          <Button type="submit">Add Movie</Button>
        </MainContent>
      </AdminForm>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarSuccessOpen}
        autoHideDuration={6000}
        onClose={handleSuccessAlert}
      >
        <MuiAlert
          onClose={handleSuccessAlert}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarsuccessMessage}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarErrorOpen}
        autoHideDuration={6000}
        onClose={handleErrorAlert}
      >
        <MuiAlert
          onClose={handleErrorAlert}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarerrorMessage}
        </MuiAlert>
      </Snackbar>
    </AdminMainContent>
  );
};

const AdminMainContent = styled.div
  `
  margin-left: 260px;
  padding: 20px;
  margin-top: 50px;
`;

const AdminHeading = styled.div
  `
  font-size: 32px;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const AdminForm = styled.form
  `
  width: 80%;
`;

const MainContent = styled.div
  `
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const MoviesPart = styled.div
  `
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label
  `
  width: 150px;
  color: #333;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Input = styled.input
  `
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
`;

const TextArea = styled.textarea
  `
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
`;

const Button = styled.button
  `
  border-radius: 7px;
  background-color: #28A745;
  margin-top: 25px;
  cursor:pointer;
`;

export default AdminMovie;