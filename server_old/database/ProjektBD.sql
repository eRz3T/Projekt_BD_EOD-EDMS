PGDMP                         {        	   ProjektBD    15.2    15.2 <    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    16399 	   ProjektBD    DATABASE     ~   CREATE DATABASE "ProjektBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE "ProjektBD";
                barte    false            �            1259    41014    appusers    TABLE     ~  CREATE TABLE public.appusers (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(1000) NOT NULL,
    class character varying(100) DEFAULT 'user'::character varying NOT NULL,
    status character varying(100) DEFAULT 'active'::character varying
);
    DROP TABLE public.appusers;
       public         heap    barte    false            �            1259    41020    appusers_id_seq    SEQUENCE     x   CREATE SEQUENCE public.appusers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.appusers_id_seq;
       public          barte    false    214            C           0    0    appusers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.appusers_id_seq OWNED BY public.appusers.id;
          public          barte    false    215            �            1259    41021    document_owner    TABLE     �   CREATE TABLE public.document_owner (
    id_owner_docown bigint NOT NULL,
    id_document_docown bigint NOT NULL,
    id_user_docown bigint NOT NULL
);
 "   DROP TABLE public.document_owner;
       public         heap    postgres    false            �            1259    41024    document_owner_doc_owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.document_owner_doc_owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.document_owner_doc_owner_id_seq;
       public          postgres    false    216            D           0    0    document_owner_doc_owner_id_seq    SEQUENCE OWNED BY     f   ALTER SEQUENCE public.document_owner_doc_owner_id_seq OWNED BY public.document_owner.id_owner_docown;
          public          postgres    false    217            �            1259    41025 	   documents    TABLE     �   CREATE TABLE public.documents (
    id_document bigint NOT NULL,
    title_document character varying(100) NOT NULL,
    note_document character varying(1000),
    date_document timestamp(6) with time zone NOT NULL,
    id_file_document bigint
);
    DROP TABLE public.documents;
       public         heap    postgres    false            �            1259    41030    documents_document_id_seq    SEQUENCE     �   CREATE SEQUENCE public.documents_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.documents_document_id_seq;
       public          postgres    false    218            E           0    0    documents_document_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.documents_document_id_seq OWNED BY public.documents.id_document;
          public          postgres    false    219            �            1259    41031    file_archive_del    TABLE     �   CREATE TABLE public.file_archive_del (
    id_arch_filarchdel bigint NOT NULL,
    date_arch_filarchdel timestamp(6) with time zone NOT NULL,
    id_user_arch_filarchdel bigint NOT NULL,
    id_file_filarchdel bigint NOT NULL
);
 $   DROP TABLE public.file_archive_del;
       public         heap    barte    false            �            1259    41034     file_archive_id_file_archive_seq    SEQUENCE     �   CREATE SEQUENCE public.file_archive_id_file_archive_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.file_archive_id_file_archive_seq;
       public          barte    false    220            F           0    0     file_archive_id_file_archive_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.file_archive_id_file_archive_seq OWNED BY public.file_archive_del.id_arch_filarchdel;
          public          barte    false    221            �            1259    41035 
   file_owner    TABLE     �   CREATE TABLE public.file_owner (
    id_owner_filown bigint NOT NULL,
    id_user_filown integer NOT NULL,
    id_file_filown integer NOT NULL
);
    DROP TABLE public.file_owner;
       public         heap    barte    false            �            1259    41038    files    TABLE     (  CREATE TABLE public.files (
    id_file bigint NOT NULL,
    name_file character varying(100) NOT NULL,
    hashed_name_file character varying(300) NOT NULL,
    upload_timestamp timestamp(6) with time zone NOT NULL,
    size_file bigint NOT NULL,
    type_file character varying(10) NOT NULL
);
    DROP TABLE public.files;
       public         heap    barte    false            �            1259    41041    files_id_file_seq    SEQUENCE     z   CREATE SEQUENCE public.files_id_file_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.files_id_file_seq;
       public          barte    false    223            G           0    0    files_id_file_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;
          public          barte    false    224            �            1259    41042    owners_id_owner_seq    SEQUENCE     |   CREATE SEQUENCE public.owners_id_owner_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.owners_id_owner_seq;
       public          barte    false    222            H           0    0    owners_id_owner_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.owners_id_owner_seq OWNED BY public.file_owner.id_owner_filown;
          public          barte    false    225            �            1259    41092    users_archive_del    TABLE     �   CREATE TABLE public.users_archive_del (
    id_arch_usrarchdel bigint NOT NULL,
    date_arch_usrarchdel timestamp(6) with time zone NOT NULL,
    id_user_arch_usrarchdel bigint NOT NULL
);
 %   DROP TABLE public.users_archive_del;
       public         heap    postgres    false            �            1259    41091 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE     �   CREATE SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq;
       public          postgres    false    227            I           0    0 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.users_archive_del_id_arch_usrarchdel_seq OWNED BY public.users_archive_del.id_arch_usrarchdel;
          public          postgres    false    226            �           2604    41043    appusers id    DEFAULT     j   ALTER TABLE ONLY public.appusers ALTER COLUMN id SET DEFAULT nextval('public.appusers_id_seq'::regclass);
 :   ALTER TABLE public.appusers ALTER COLUMN id DROP DEFAULT;
       public          barte    false    215    214            �           2604    41044    document_owner id_owner_docown    DEFAULT     �   ALTER TABLE ONLY public.document_owner ALTER COLUMN id_owner_docown SET DEFAULT nextval('public.document_owner_doc_owner_id_seq'::regclass);
 M   ALTER TABLE public.document_owner ALTER COLUMN id_owner_docown DROP DEFAULT;
       public          postgres    false    217    216            �           2604    41045    documents id_document    DEFAULT     ~   ALTER TABLE ONLY public.documents ALTER COLUMN id_document SET DEFAULT nextval('public.documents_document_id_seq'::regclass);
 D   ALTER TABLE public.documents ALTER COLUMN id_document DROP DEFAULT;
       public          postgres    false    219    218            �           2604    41046 #   file_archive_del id_arch_filarchdel    DEFAULT     �   ALTER TABLE ONLY public.file_archive_del ALTER COLUMN id_arch_filarchdel SET DEFAULT nextval('public.file_archive_id_file_archive_seq'::regclass);
 R   ALTER TABLE public.file_archive_del ALTER COLUMN id_arch_filarchdel DROP DEFAULT;
       public          barte    false    221    220            �           2604    41047    file_owner id_owner_filown    DEFAULT     }   ALTER TABLE ONLY public.file_owner ALTER COLUMN id_owner_filown SET DEFAULT nextval('public.owners_id_owner_seq'::regclass);
 I   ALTER TABLE public.file_owner ALTER COLUMN id_owner_filown DROP DEFAULT;
       public          barte    false    225    222            �           2604    41048    files id_file    DEFAULT     n   ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);
 <   ALTER TABLE public.files ALTER COLUMN id_file DROP DEFAULT;
       public          barte    false    224    223            �           2604    41095 $   users_archive_del id_arch_usrarchdel    DEFAULT     �   ALTER TABLE ONLY public.users_archive_del ALTER COLUMN id_arch_usrarchdel SET DEFAULT nextval('public.users_archive_del_id_arch_usrarchdel_seq'::regclass);
 S   ALTER TABLE public.users_archive_del ALTER COLUMN id_arch_usrarchdel DROP DEFAULT;
       public          postgres    false    227    226    227            /          0    41014    appusers 
   TABLE DATA           U   COPY public.appusers (id, name, surname, email, password, class, status) FROM stdin;
    public          barte    false    214   RI       1          0    41021    document_owner 
   TABLE DATA           ]   COPY public.document_owner (id_owner_docown, id_document_docown, id_user_docown) FROM stdin;
    public          postgres    false    216   �I       3          0    41025 	   documents 
   TABLE DATA           p   COPY public.documents (id_document, title_document, note_document, date_document, id_file_document) FROM stdin;
    public          postgres    false    218   �I       5          0    41031    file_archive_del 
   TABLE DATA           �   COPY public.file_archive_del (id_arch_filarchdel, date_arch_filarchdel, id_user_arch_filarchdel, id_file_filarchdel) FROM stdin;
    public          barte    false    220   �I       7          0    41035 
   file_owner 
   TABLE DATA           U   COPY public.file_owner (id_owner_filown, id_user_filown, id_file_filown) FROM stdin;
    public          barte    false    222   J       8          0    41038    files 
   TABLE DATA           m   COPY public.files (id_file, name_file, hashed_name_file, upload_timestamp, size_file, type_file) FROM stdin;
    public          barte    false    223   1J       <          0    41092    users_archive_del 
   TABLE DATA           n   COPY public.users_archive_del (id_arch_usrarchdel, date_arch_usrarchdel, id_user_arch_usrarchdel) FROM stdin;
    public          postgres    false    227   NJ       J           0    0    appusers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.appusers_id_seq', 11, true);
          public          barte    false    215            K           0    0    document_owner_doc_owner_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.document_owner_doc_owner_id_seq', 75, true);
          public          postgres    false    217            L           0    0    documents_document_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.documents_document_id_seq', 60, true);
          public          postgres    false    219            M           0    0     file_archive_id_file_archive_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.file_archive_id_file_archive_seq', 11, true);
          public          barte    false    221            N           0    0    files_id_file_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.files_id_file_seq', 82, true);
          public          barte    false    224            O           0    0    owners_id_owner_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.owners_id_owner_seq', 82, true);
          public          barte    false    225            P           0    0 (   users_archive_del_id_arch_usrarchdel_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.users_archive_del_id_arch_usrarchdel_seq', 1, false);
          public          postgres    false    226            �           2606    41050    appusers appusers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.appusers
    ADD CONSTRAINT appusers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.appusers DROP CONSTRAINT appusers_pkey;
       public            barte    false    214            �           2606    41052 "   document_owner document_owner_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT document_owner_pkey PRIMARY KEY (id_owner_docown);
 L   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT document_owner_pkey;
       public            postgres    false    216            �           2606    41054    documents documents_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id_document);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public            postgres    false    218            �           2606    41056 "   file_archive_del file_archive_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT file_archive_pkey PRIMARY KEY (id_arch_filarchdel);
 L   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT file_archive_pkey;
       public            barte    false    220            �           2606    41058    files files_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            barte    false    223            �           2606    41060    file_owner owners_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id_owner_filown);
 @   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_pkey;
       public            barte    false    222            �           2606    41097 (   users_archive_del users_archive_del_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.users_archive_del
    ADD CONSTRAINT users_archive_del_pkey PRIMARY KEY (id_arch_usrarchdel);
 R   ALTER TABLE ONLY public.users_archive_del DROP CONSTRAINT users_archive_del_pkey;
       public            postgres    false    227            �           2606    41081 $   document_owner id_document_docown_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT id_document_docown_fk FOREIGN KEY (id_document_docown) REFERENCES public.documents(id_document) NOT VALID;
 N   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT id_document_docown_fk;
       public          postgres    false    216    3217    218            �           2606    41076     file_archive_del id_file_arch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT id_file_arch_fk FOREIGN KEY (id_file_filarchdel) REFERENCES public.files(id_file) NOT VALID;
 J   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT id_file_arch_fk;
       public          barte    false    3223    223    220            �           2606    41071     file_archive_del id_user_arch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_archive_del
    ADD CONSTRAINT id_user_arch_fk FOREIGN KEY (id_user_arch_filarchdel) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.file_archive_del DROP CONSTRAINT id_user_arch_fk;
       public          barte    false    220    3213    214            �           2606    41086     document_owner id_user_docown_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.document_owner
    ADD CONSTRAINT id_user_docown_fk FOREIGN KEY (id_user_docown) REFERENCES public.appusers(id) NOT VALID;
 J   ALTER TABLE ONLY public.document_owner DROP CONSTRAINT id_user_docown_fk;
       public          postgres    false    214    3213    216            �           2606    41098     users_archive_del id_userarch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_archive_del
    ADD CONSTRAINT id_userarch_fk FOREIGN KEY (id_user_arch_usrarchdel) REFERENCES public.appusers(id);
 J   ALTER TABLE ONLY public.users_archive_del DROP CONSTRAINT id_userarch_fk;
       public          postgres    false    214    227    3213            �           2606    41061    file_owner owners_id_file_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_id_file_fkey FOREIGN KEY (id_file_filown) REFERENCES public.files(id_file);
 H   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_id_file_fkey;
       public          barte    false    223    3223    222            �           2606    41066    file_owner owners_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.file_owner
    ADD CONSTRAINT owners_id_user_fkey FOREIGN KEY (id_user_filown) REFERENCES public.appusers(id);
 H   ALTER TABLE ONLY public.file_owner DROP CONSTRAINT owners_id_user_fkey;
       public          barte    false    222    3213    214            /   [   x�]�1
�0���0�z����%� Ec����^���^@G�xC�ƙ0�14�*�vUpΠE���.v!`T��`P�w����/��1y��	3$�      1      x������ � �      3      x������ � �      5      x������ � �      7      x������ � �      8      x������ � �      <      x������ � �     