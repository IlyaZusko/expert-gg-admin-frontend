/* eslint-disable jsx-a11y/alt-text */
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { Image, X } from 'lucide-react';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

import { db, storage } from '@/firebase/config';
import { ProductType } from '@/lib/constants';
import { useAppDispatch } from '@/lib/store';
import { setListProducts } from '@/lib/store/service/productsSlice';
import { cn } from '@/lib/utils';
import { CreateProductSchema } from '@/screens/Products/utils';

import TextInput from './TextInput';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { SheetClose, SheetContent } from './ui/sheet';
import { Textarea } from './ui/textarea';

interface ICreateProduct {
  name: string;
  description: string;
  price: string;
  type: string;
}

const initialValues: ICreateProduct = {
  name: '',
  description: '',
  price: '',
  type: ProductType.Ring,
};

const CreateProductForm = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);

  const handleDrop = async (acceptedFiles: File[]) => {
    setFileError(false);
    const file = acceptedFiles[0];
    setSelectedFile(file);
  };

  const formik = useFormik<ICreateProduct>({
    initialValues,
    validationSchema: CreateProductSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name, description, price, type } = values;
      if (selectedFile) {
        addDoc(collection(db, 'products'), {
          name,
          description,
          price: Number(price),
          type,
          image: '',
          id: '',
        }).then((res) => {
          const storageRef = ref(storage, res.id);
          uploadBytes(storageRef, selectedFile).then(async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref);
            updateDoc(doc(db, 'products', res.id), {
              id: res.id,
              image: url,
            }).then(() => {
              dispatch(
                setListProducts({
                  name,
                  description,
                  price: Number(price),
                  type,
                  image: url,
                  id: res.id,
                }),
              );
            });
          });
        });
      } else {
        setFileError(true);
      }
    },
  });

  const { values, submitForm, setFieldValue, errors } = formik;

  const onPriceChange = (str: string) => {
    const regex = /^\d+$/;
    if (regex.test(str) || str === '') {
      setFieldValue('price', str);
    }
  };

  return (
    <SheetContent className="flex flex-col justify-between">
      <div>
        <div className="w-full px-5 flex flex-row justify-between items-center bg-indigo-600 py-4">
          <p className="font-semibold text-white">Создание нового товара</p>
          <SheetClose>
            <X className="h-5 w-5 text-white" />
          </SheetClose>
        </div>
        <div className="flex flex-col px-5 pt-5 gap-y-5">
          <div className="flex flex-row justify-between items-start">
            <p className="text-sm text-gray-700">Имя товара</p>
            <TextInput
              placeholder="Имя товара..."
              value={values.name}
              onChange={(v) => setFieldValue('name', v)}
              className="w-[280px] h-8 rounded-[4px] text-sm"
              isCustomWith
              error={errors.name}
            />
          </div>
          <div className="flex flex-row justify-between items-start">
            <p className="text-sm text-gray-700">Описание товара</p>
            <div className="flex flex-col">
              <Textarea
                placeholder="Описание товара..."
                className={cn(
                  'w-[280px] h-8 rounded-[4px] text-sm',
                  errors.description && 'border-[#EB5757]',
                )}
                value={values.description}
                onChange={(event) =>
                  setFieldValue('description', event.target.value)
                }
              />
              {errors.description && (
                <p className="text-[#EB5757] text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between items-start">
            <p className="text-sm text-gray-700">Тип товара</p>
            <Select
              value={values.type}
              onValueChange={(v) => setFieldValue('type', v)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProductType.Ring}>Кольцо</SelectItem>
                <SelectItem value={ProductType.Necklace}>Ожерелье</SelectItem>
                <SelectItem value={ProductType.Pendant}>Кулон</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-between items-start">
            <p className="text-sm text-gray-700">Цена товара (BYN)</p>
            <TextInput
              placeholder="Цена товара..."
              value={values.price}
              onChange={(v) => onPriceChange(v)}
              className="w-[280px] h-8 rounded-[4px] text-sm"
              isCustomWith
              error={errors.price}
            />
          </div>
          <div className="flex flex-row justify-between items-start">
            <p className="text-sm text-gray-700">Изображение</p>
            <div className="flex flex-col">
              <div
                className={cn(
                  'flex w-[280px] h-20 border rounded-[4px] px-3 flex-col justify-center items-center cursor-pointer',
                  fileError && 'border-[#EB5757]',
                )}
              >
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="w-full flex flex-col justify-center items-center gap-y-1"
                      >
                        <input {...getInputProps()} />
                        <Image width={20} height={20} color="#4F46E5" />
                        <p className="text-xs text-center">
                          Перетащите нужный файл или нажмите чтобы выбрать
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              {selectedFile && (
                <div className="mt-2">
                  <p className="text-xs mb-1 font-medium">Выбранный файл:</p>
                  <p className="text-xs">{selectedFile.name}</p>
                </div>
              )}
              {fileError && (
                <p className="text-[#EB5757] text-xs mt-1">Выберите файл*</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-3 flex flex-row justify-end bg-gray-50 gap-x-4">
        <SheetClose>
          <Button
            size="sm"
            className=" font-normal"
            onClick={() => submitForm()}
          >
            Создать
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  );
};

export default CreateProductForm;
