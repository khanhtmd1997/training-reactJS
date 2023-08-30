require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

mongoose.connect(mongoString, (err, db) => {
  if (err) throw err;
  const rolesCollection = db.collection("roles");
  console.log("Connected to the table", rolesCollection.collectionName);

  const arrayRoles = [
    {
      name: "Admin",
      description: "Quản trị",
      isActive: true,
      isAdmin: true,
    },
    {
      name: "Customer",
      description: "Khách hàng",
      isActive: true,
      isAdmin: false,
    },
    {
      name: "Other",
      description: "Khách vãng lai",
      isActive: true,
      isAdmin: false,
    },
    {
      name: "None",
      description: "None",
      isActive: false,
      isAdmin: false,
    },
  ];

  rolesCollection.find().toArray((err, res) => {
    if (err) throw err;
    if (res.length > 0) return;
    else {
      rolesCollection.insert(arrayRoles, function (err, r) {
        if (err) throw err;
        console.log(r);
      });
    }
  });

  const categoriesCollection = db.collection("categories");

  const arrayCategories = [
    {
      category: "Điện thoại",
      description: "Điện thoại",
      isActive: true,
      children: [
        {
          name: "Iphone",
          isActive: true,
        },
        {
          name: "Samsung",
          isActive: true,
        },
        {
          name: "Nokia",
          isActive: true,
        },
        {
          name: "Oppo",
          isActive: true,
        },
      ],
    },
    {
      category: "Máy tính bảng",
      description: "Máy tính bảng",
      isActive: true,
      children: [
        {
          name: "Macbook",
          isActive: true,
        },
        {
          name: "HP",
          isActive: true,
        },
        {
          name: "Toshiba",
          isActive: true,
        },
        {
          name: "Sony",
          isActive: true,
        },
      ],
    },
    {
      category: "Laptop",
      description: "Laptop",
      isActive: true,
      children: [
        {
          name: "Macbook",
          isActive: true,
        },
        {
          name: "HP",
          isActive: true,
        },
        {
          name: "Dell",
          isActive: true,
        },
        {
          name: "SG",
          isActive: true,
        },
      ],
    },
  ];

  categoriesCollection.find().toArray((err, res) => {
    if (err) throw err;
    if (res.length > 0) return;
    else {
      categoriesCollection.insert(arrayCategories, function (err, r) {
        if (err) throw err;
        console.log(r);
      });
    }
  });

  const categoriesChildCollection = db.collection("categorychildren");
  const arrayCategoryChildrenPhone = [
    {
      name: "Iphone",
      isActive: true,
    },
    {
      name: "Samsung",
      isActive: true,
    },
    {
      name: "Nokia",
      isActive: true,
    },
    {
      name: "Oppo",
      isActive: true,
    },
  ];

  const arrayCategoryChildrenIpad = [
    {
      name: "Macbook",
      isActive: true,
    },
    {
      name: "HP",
      isActive: true,
    },
    {
      name: "Toshiba",
      isActive: true,
    },
    {
      name: "Sony",
      isActive: true,
    },
  ];

  const arrayCategoryChildrenLaptop = [
    {
      name: "Macbook",
      isActive: true,
    },
    {
      name: "HP",
      isActive: true,
    },
    {
      name: "Dell",
      isActive: true,
    },
    {
      name: "SG",
      isActive: true,
    },
  ];

  categoriesChildCollection.find().toArray((err, res) => {
    if (err) throw err;
    if (res.length > 0) return;
    else {
      const array = [];
      categoriesCollection.find({}).toArray((e, result) => {
        if (result.length > 0) {
          result.forEach((element, index) => {
            if (index === 0) {
              arrayCategoryChildrenPhone.forEach((phone) => {
                array.push({
                  ...phone,
                  categoryId: element._id.toString(),
                });
              });
            } else if (index === 1) {
              arrayCategoryChildrenIpad.forEach((ipad) => {
                array.push({
                  ...ipad,
                  categoryId: element._id.toString(),
                });
              });
            } else {
              arrayCategoryChildrenLaptop.forEach((laptop) => {
                array.push({
                  ...laptop,
                  categoryId: element._id.toString(),
                });
              });
            }
          });

          categoriesChildCollection.insert(array, function (err, r) {
            if (err) throw err;
            console.log(r);
          });
        }
      });
    }
  });

  const productsCollection = db.collection("products");
  const arrayProducts = [
    {
      name: "Điện thoại Samsung 1",
      price: "8000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "8%",
      memory: "64",
      color: "black",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Nokia 2",
      price: "10000000",
      description:
        "Thông tin sản phẩm\nNokia một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Nokia\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/303937/nokia-g22-xanh-thumb-1-2-600x600.jpg",
      discount: "8%",
      memory: "128",
      color: "black",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 3",
      price: "8000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "5%",
      memory: "128",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 4",
      price: "10000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "2%",
      memory: "256",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Nokia 5",
      price: "8000000",
      description:
        "Thông tin sản phẩm\nNokia một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Nokia\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/303937/nokia-g22-xanh-thumb-1-2-600x600.jpg",
      discount: "5%",
      memory: "128",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 6",
      price: "8000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "10%",
      memory: "256",
      color: "blue",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Nokia 7",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nNokia một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Nokia\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/303937/nokia-g22-xanh-thumb-1-2-600x600.jpg",
      discount: "5%",
      memory: "64",
      color: "blue",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 8",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "8%",
      memory: "256",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 9",
      price: "8000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "8%",
      memory: "64",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 10",
      price: "7000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "5%",
      memory: "256",
      color: "blue",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 11",
      price: "9000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "15%",
      memory: "128",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 12",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "8%",
      memory: "64",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 13",
      price: "8000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "5%",
      memory: "128",
      color: "red",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 14",
      price: "4000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "15%",
      memory: "128",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 15",
      price: "7000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "8%",
      memory: "128",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 16",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "10%",
      memory: "128",
      color: "black",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Nokia 17",
      price: "9000000",
      description:
        "Thông tin sản phẩm\nNokia một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Nokia\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/303937/nokia-g22-xanh-thumb-1-2-600x600.jpg",
      discount: "2%",
      memory: "256",
      color: "red",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 18",
      price: "15000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "2%",
      memory: "64",
      color: "green",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 19",
      price: "7000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "2%",
      memory: "64",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 20",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "8%",
      memory: "256",
      color: "green",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 21",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "2%",
      memory: "128",
      color: "green",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 22",
      price: "7000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "8%",
      memory: "64",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 23",
      price: "10000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "15%",
      memory: "64",
      color: "black",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 24",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "2%",
      memory: "128",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Nokia 25",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nNokia một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Nokia\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/303937/nokia-g22-xanh-thumb-1-2-600x600.jpg",
      discount: "2%",
      memory: "256",
      color: "red",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 26",
      price: "7000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "10%",
      memory: "128",
      color: "white",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Nokia 27",
      price: "25000000",
      description:
        "Thông tin sản phẩm\nNokia một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Nokia\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/303937/nokia-g22-xanh-thumb-1-2-600x600.jpg",
      discount: "8%",
      memory: "256",
      color: "yellow",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Iphone 28",
      price: "4000000",
      description:
        "Thông tin sản phẩm\nIphone một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Iphone\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
      discount: "2%",
      memory: "128",
      color: "black",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Samsung 29",
      price: "9000000",
      description:
        "Thông tin sản phẩm\nSamsung một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Samsung\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
      discount: "10%",
      memory: "128",
      color: "green",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 1,
      resolutionFrontCamera: "12 MP",
    },
    {
      name: "Điện thoại Oppo 30",
      price: "7000000",
      description:
        "Thông tin sản phẩm\nOppo một siêu phẩm trong giới smartphone Máy trang bị con chip Apple A16 Bionic vô cùng mạnh mẽ, đi kèm theo đó là thiết kế hình màn hình mới, hứa hẹn mang lại những trải nghiệm đầy mới mẻ cho người dùng Oppo\nThiết kế cao cấp bền bỉ\niPhone năm nay sẽ được thừa hưởng nét đặc trưng từ người anh iPhone 13 Pro Max, vẫn sẽ là khung thép không gỉ và mặt lưng kính cường lực kết hợp với tạo hình vuông vức hiện đại thông qua cách tạo hình phẳng ở các cạnh và phần mặt lưng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-reno10-blue-thumbnew-600x600.jpg",
      discount: "2%",
      memory: "256",
      color: "green",
      width: '6.7"',
      screenTechnology: "OLED",
      resolutionScreen: "2796 x 1290 Pixels",
      widescreen: '6.7" - Tần số quét 120 Hz',
      maximumBrightness: "2000 nits",
      touchScreen: "Kính cường lực Ceramic Shield",
      resolutionRearCamera: "Chính 48 MP & Phụ 12 MP, 12 MP",
      film: "<ul>\n      <li>HD 720p@30fps</li>\n      <li>FullHD 1080p@60fps</li>\n      <li>FullHD 1080p@30fps</li>\n      <li>4K 2160p@24fps</li>\n      <li>4K 2160p@30fps</li>\n      <li>4K 2160p@60fps</li>\n      </ul>",
      flash: 0,
      resolutionFrontCamera: "12 MP",
    },
  ];

  productsCollection.find().toArray((err, res) => {
    if (err) throw err;
    if (res.length > 0) return;
    else {
      categoriesChildCollection.find({}).toArray((e, result) => {
        if (result.length > 0) {
          result.forEach((categoryChild) => {
            arrayProducts.forEach((el) => {
              // console.log(123, el.name, categoryChild.name);
              if (el.name.indexOf(categoryChild.name) > -1) {
                el.categoryId = categoryChild._id.toString();
              }
              console.log(444, el);
            });
          });

          productsCollection.insert(arrayProducts, function (err, r) {
            if (err) throw err;
            console.log(r);
          });
        }
      });
    }
  });
});

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

//
const app = express();
app.use(cors());
app.use(express.json());

//routes api
const routes = require("./routes/routes");
const routesUsers = require("./routes/routes.users");
const routesRoles = require("./routes/routes.roles");
const routesProducts = require("./routes/routes.product");
const routesCategories = require("./routes/routes.category");
const routesCart = require("./routes/routes.cart");
const routesCategoryChild = require("./routes/routes.categoryChild");
app.use("/api/users", routesUsers);
app.use("/api/roles", routesRoles);
app.use("/api", routes);
app.use("/api/products", routesProducts);
app.use("/api/categories", routesCategories);
app.use("/api/carts", routesCart);
app.use("/api/category-children", routesCategoryChild);
//
app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
});
