package com.revature.services;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;

import com.revature.model.User;
import com.revature.util.ConnectionUtil;
import com.revature.util.HibernateUtil;

public class LoginService {

	public static String sql;
	public static PreparedStatement ps;
	public static ResultSet rs;

	public static boolean login(String username, String password) {
		String u = null, p = null;
		try (Connection conn = ConnectionUtil.getConnectionFromFile("connection.properties")) {
			sql = "select username, erspassword from ersuser where username=? and erspassword=?";

			ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ps.setString(2, password);
			rs = ps.executeQuery();

			if (rs.next()) {
				u = rs.getString(1);
				p = rs.getString(2);
			}
			if (u != null && p != null) {
				return true;
				// return (username.equalsIgnoreCase("Aretha") && password.equals("awesome"));
			} else {
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	public static User confirm(String username, String password) {
		Session ses = HibernateUtil.getSession(); // capture the session
		List<User> u = ses.createQuery(
				"from User where username = '" + username + "' and password = '" + password + "' ", User.class).list();
		System.out.println(u);
		if (u.size() > 0) {
			return u.get(0);
		} else {
			return null;
		}
	}
}
